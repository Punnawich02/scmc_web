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
const dataCategorySchema = z.object({
  name: z.string().min(1, "name ต้องไม่ว่าง"),
  description: z.string().min(1, "description ต้องไม่ว่าง"),
  displayNameTh: z.string().min(1, "displayNameTh ต้องไม่ว่าง"),
  displayNameEn: z.string().min(1, "displayNameEn ต้องไม่ว่าง"),
  createBy: z.string().min(1, "createBy ต้องไม่ว่าง"),
});

const dataCategoryUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
  name: z.string().min(1, "name ต้องไม่ว่าง"),
  description: z.string().min(1, "description ต้องไม่ว่าง"),
  displayNameTh: z.string().min(1, "displayNameTh ต้องไม่ว่าง"),
  displayNameEn: z.string().min(1, "displayNameEn ต้องไม่ว่าง"),
  editBy: z.string().min(1, "editBy ต้องไม่ว่าง"),
});

const dataCategoryDeleteSchema = z.object({
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

// Get all Data Category
export async function GET(req: Request) {
  // Apply rate limiting
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const routes = await prisma.dataCategory.findMany();
    return Response.json(routes);
  } catch (error) {
    console.error("Failed to fetch data categories:", error);
    return Response.json(
      { error: "Failed to fetch data categories" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post new Category
export async function POST(req: Request) {
  if (!(await isBasicAuthValid(req))) return unauthorizedResponse();

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
    const parseResult = dataCategorySchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { name, description, displayNameTh, displayNameEn, createBy } =
      parseResult.data;

    const newCategory = await prisma.dataCategory.create({
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn,
        createBy,
      },
    });

    return Response.json(newCategory);
  } catch (error) {
    console.error("Failed to create data category:", error);
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

// Edit Category
export async function PUT(req: Request) {
  if (!(await isBasicAuthValid(req))) return unauthorizedResponse();

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
    const parseResult = dataCategoryUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id, name, description, displayNameTh, displayNameEn, editBy } =
      parseResult.data;

    // Check if category exists
    const categoryExists = await prisma.dataCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    const updatedCategory = await prisma.dataCategory.update({
      where: { id },
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn,
        editBy,
      },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    console.error("Failed to update data category:", error);
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

// Delete Category
export async function DELETE(req: Request) {
  if (!(await isBasicAuthValid(req))) return unauthorizedResponse();

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
    const parseResult = dataCategoryDeleteSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id } = parseResult.data;

    // Check if category exists
    const categoryExists = await prisma.dataCategory.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    const deletedCategory = await prisma.dataCategory.delete({
      where: { id },
    });

    return Response.json(deletedCategory);
  } catch (error) {
    console.error("Failed to delete data category:", error);
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
