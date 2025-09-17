import { PrismaClient } from "@prisma/client";
// Note: Use standard Request to simplify typing and testing
import bcrypt from "bcrypt";
import { rateLimit } from "../../../lib/rate-limit";
import { z } from "zod";

const prisma = new PrismaClient();
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1 MB
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // จำกัด 100 requests ต่อ 15 นาที
});

// Validation schemas
const dataEmbedSchema = z.object({
  title: z.string().min(1, "title ต้องไม่ว่าง"),
  embedCode: z.string().min(1, "embedCode ต้องไม่ว่าง"),
  createBy: z.string().min(1, "createBy ต้องไม่ว่าง"),
});

const dataEmbedUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก").optional(),
  title: z.string().min(1, "title ต้องไม่ว่าง"),
  embedCode: z.string().min(1, "embedCode ต้องไม่ว่าง"),
  editBy: z.string().min(1, "editBy ต้องไม่ว่าง"),
});

const dataEmbedDeleteSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก").optional(),
});

async function isBasicAuthValid(req: Request): Promise<boolean> {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const encoded = auth.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  const validUsername = process.env.AUTH_USERNAME;
  const validPasswordHash = process.env.AUTH_PASSWORD_BCRYPT;

  if (!validUsername || !validPasswordHash || !password) return false;

  try {
    // Fix: Compare username as string, not with bcrypt
    const isUsernameValid = username === validUsername;
    const isPasswordValid = await bcrypt.compare(password, validPasswordHash);
    return isUsernameValid && isPasswordValid;
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
}

function unauthorizedResponse(): Response {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Get embed code in that category
export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const DataCategory = category;

    const categoryRecord = await prisma.dataCategory.findUnique({
      where: { name: DataCategory },
    });

    if (!categoryRecord) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    const categories_id = categoryRecord.id;
    const schedule = await prisma.dataEmbed.findMany({
      where: { categoryId: Number(categories_id) },
    });

    return Response.json(schedule);
  } catch (error) {
    console.error("Error fetching data category:", error);
    return Response.json(
      {
        error: "Failed to fetch data category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// New embed code in that category
export async function POST(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  if (!(await isBasicAuthValid(request))) return unauthorizedResponse();

  // Check payload size
  if (
    request.headers.get("content-length") &&
    parseInt(request.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { category } = await context.params;
    const categoryName = category;

    // Parse and validate request body
    const body = await request.json();
    const parseResult = dataEmbedSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { title, embedCode, createBy } = parseResult.data;

    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    const newPost = await prisma.dataEmbed.create({
      data: {
        categoryId,
        title,
        embedCode,
        createBy,
      },
    });

    return Response.json(newPost);
  } catch (error) {
    console.error("Error creating embed:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update embed code in that category
export async function PUT(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  if (!(await isBasicAuthValid(request))) return unauthorizedResponse();

  // Check payload size
  if (
    request.headers.get("content-length") &&
    parseInt(request.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { category } = await context.params;
    const categoryName = category;

    // Parse and validate request body
    const body = await request.json();
    const parseResult = dataEmbedUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id, title, embedCode, editBy } = parseResult.data;

    // Find the category
    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    // If id is provided, update specific embed, otherwise update first one
    let embedToUpdate;
    if (id) {
      embedToUpdate = await prisma.dataEmbed.findFirst({
        where: { id, categoryId },
      });
    } else {
      embedToUpdate = await prisma.dataEmbed.findFirst({
        where: { categoryId },
      });
    }

    if (!embedToUpdate) {
      return Response.json(
        { error: "No embed found for this category" },
        { status: 404 }
      );
    }

    const updateEmbed = await prisma.dataEmbed.update({
      where: { id: embedToUpdate.id },
      data: {
        title,
        embedCode,
        editBy,
      },
    });

    return Response.json(updateEmbed);
  } catch (error) {
    console.error("Error updating embed:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete embed code
export async function DELETE(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  if (!(await isBasicAuthValid(request))) return unauthorizedResponse();

  // Check payload size
  if (
    request.headers.get("content-length") &&
    parseInt(request.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(request);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { category } = await context.params;
    const categoryName = category;

    // Parse and validate request body (optional for specific ID)
    let embedId: number | undefined;
    try {
      const body = await request.json();
      const parseResult = dataEmbedDeleteSchema.safeParse(body);
      if (parseResult.success) {
        embedId = parseResult.data.id;
      }
    } catch {
      // If no body or invalid JSON, delete first embed
    }

    // Find the category
    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    // If embedId is provided, delete specific embed, otherwise delete first one
    let embedToDelete;
    if (embedId) {
      embedToDelete = await prisma.dataEmbed.findFirst({
        where: { id: embedId, categoryId },
      });
    } else {
      embedToDelete = await prisma.dataEmbed.findFirst({
        where: { categoryId },
      });
    }

    if (!embedToDelete) {
      return Response.json(
        { error: "No embed found for this category" },
        { status: 404 }
      );
    }

    const deletedEmbed = await prisma.dataEmbed.delete({
      where: { id: embedToDelete.id },
    });

    return Response.json({
      message: "Data embed deleted successfully",
      deletedEmbed,
    });
  } catch (error) {
    console.error("Error deleting embed:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
