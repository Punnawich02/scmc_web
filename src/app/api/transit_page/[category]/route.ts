// /api/transit_page/[category]/routes.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { rateLimit } from "../../../lib/rate-limit";
import { z } from "zod";
// Note: Use standard Request for simplicity; we don't use NextRequest extras

const prisma = new PrismaClient();
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1 MB
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // จำกัด 100 requests ต่อ 15 นาที
});

// Validation schemas
const transitServiceSchema = z.object({
  imageUrl: z.string().url("imageUrl ต้องเป็น URL ที่ถูกต้อง"),
  title: z.string().min(1, "title ต้องไม่ว่าง"),
  createBy: z.string().min(1, "createBy ต้องไม่ว่าง"),
});

const transitServiceUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก").optional(),
  imageUrl: z.string().url("imageUrl ต้องเป็น URL ที่ถูกต้อง"),
  title: z.string().min(1, "title ต้องไม่ว่าง"),
  editBy: z.string().min(1, "editBy ต้องไม่ว่าง"),
});

const transitServiceDeleteSchema = z.object({
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

// GET all route category
export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const transitCategory = category;

    const categoryRecord = await prisma.transitCategory.findUnique({
      where: { name: transitCategory },
    });

    if (!categoryRecord) {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const categories_id = categoryRecord.id;
    const schedule = await prisma.transitService.findMany({
      where: { categoryId: Number(categories_id) },
    });

    return Response.json(schedule);
  } catch (error) {
    console.error("Error fetching transit category:", error);
    return Response.json(
      {
        error: "Failed to fetch transit category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST new Time table on that Category
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
    const parseResult = transitServiceSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { imageUrl, title, createBy } = parseResult.data;

    const categories = await prisma.transitCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const newPost = await prisma.transitService.create({
      data: {
        categoryId,
        imageUrl,
        title,
        createBy,
      },
    });

    return Response.json(newPost);
  } catch (error) {
    console.error("Error creating transit service:", error);
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

// Update(PUT) Time table on that Category
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
    const parseResult = transitServiceUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id, imageUrl, title, editBy } = parseResult.data;

    // Find the category
    const categories = await prisma.transitCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    // If id is provided, update specific service, otherwise update first one
    let serviceToUpdate;
    if (id) {
      serviceToUpdate = await prisma.transitService.findFirst({
        where: { id, categoryId },
      });
    } else {
      serviceToUpdate = await prisma.transitService.findFirst({
        where: { categoryId },
      });
    }

    if (!serviceToUpdate) {
      return Response.json(
        { error: "No transit service found for this category" },
        { status: 404 }
      );
    }

    const updateTransitService = await prisma.transitService.update({
      where: { id: serviceToUpdate.id },
      data: {
        imageUrl,
        title,
        editBy,
      },
    });

    return Response.json(updateTransitService);
  } catch (error) {
    console.error("Error updating transit service:", error);
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

// Delete Time table on that Category
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
    let serviceId: number | undefined;
    try {
      const body = await request.json();
      const parseResult = transitServiceDeleteSchema.safeParse(body);
      if (parseResult.success) {
        serviceId = parseResult.data.id;
      }
    } catch {
      // If no body or invalid JSON, delete first service
    }

    // Find the category
    const categories = await prisma.transitCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    // If serviceId is provided, delete specific service, otherwise delete first one
    let serviceToDelete;
    if (serviceId) {
      serviceToDelete = await prisma.transitService.findFirst({
        where: { id: serviceId, categoryId },
      });
    } else {
      serviceToDelete = await prisma.transitService.findFirst({
        where: { categoryId },
      });
    }

    if (!serviceToDelete) {
      return Response.json(
        { error: "No transit service found for this category" },
        { status: 404 }
      );
    }

    const deletedService = await prisma.transitService.delete({
      where: { id: serviceToDelete.id },
    });

    return Response.json({
      message: "Transit service deleted successfully",
      deletedService,
    });
  } catch (error) {
    console.error("Error deleting transit service:", error);
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
