import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { rateLimit } from "../../lib/rate-limit";
import { z } from "zod";

const prisma = new PrismaClient();
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1 MB
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // จำกัด 100 requests ต่อ 15 นาที
});

// Validation schemas
const transitCategorySchema = z.object({
  name: z.string().min(1, "name ต้องไม่ว่าง"),
  display_name_th: z.string().min(1, "display_name_th ต้องไม่ว่าง"),
  display_name_en: z.string().min(1, "display_name_en ต้องไม่ว่าง"),
  createBy: z.string().min(1, "createBy ต้องไม่ว่าง"),
});

const transitCategoryUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
  name: z.string().min(1, "name ต้องไม่ว่าง"),
  display_name_th: z.string().min(1, "display_name_th ต้องไม่ว่าง"),
  display_name_en: z.string().min(1, "display_name_en ต้องไม่ว่าง"),
  editBy: z.string().min(1, "editBy ต้องไม่ว่าง"),
});

const transitCategoryDeleteSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
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

// Get All Transit Route Categories
export async function GET() {
  try {
    const routes = await prisma.transitCategory.findMany();
    return Response.json(routes);
  } catch (error) {
    console.error("Failed to fetch transit route categories:", error);
    return Response.json(
      { error: "Failed to fetch transit route categories" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post new Transit Categories (Transit Route) With Basic Auth and Validation
export async function POST(req: Request) {
  if (! isBasicAuthValid(req)) return unauthorizedResponse();

  // Check payload size
  if (
    req.headers.get("content-length") &&
    parseInt(req.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const parseResult = transitCategorySchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { name, display_name_th, display_name_en, createBy } =
      parseResult.data;

    const newCategory = await prisma.transitCategory.create({
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en,
        createBy,
      },
    });

    return Response.json(newCategory);
  } catch (error) {
    console.error("Failed to create transit category:", error);
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

// Update Transit Categories (Transit Route)
export async function PUT(req: Request) {
  if (! isBasicAuthValid(req)) return unauthorizedResponse();

  // Check payload size
  if (
    req.headers.get("content-length") &&
    parseInt(req.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const parseResult = transitCategoryUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id, name, display_name_th, display_name_en, editBy } =
      parseResult.data;

    // Check if category exists
    const categoryExists = await prisma.transitCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.transitCategory.update({
      where: { id },
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en,
        editBy,
      },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    console.error("Failed to update transit category:", error);
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

// Delete Transit Categories (Transit Route)
export async function DELETE(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

  // Check payload size
  if (
    req.headers.get("content-length") &&
    parseInt(req.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // Apply rate limiting
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const parseResult = transitCategoryDeleteSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id } = parseResult.data;

    // Check if category exists
    const categoryExists = await prisma.transitCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const deletedCategory = await prisma.transitCategory.delete({
      where: { id },
    });

    return Response.json(deletedCategory);
  } catch (error) {
    console.error("Failed to delete transit category:", error);
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
