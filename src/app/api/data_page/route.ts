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
  
  categoryNameTh: z.string().min(1, "categoryNameTh ต้องไม่ว่าง"),
  categoryNameEn: z.string().min(1, "categoryNameEn ต้องไม่ว่าง"),

  embedCode: z.string().optional(),
  linkUrl: z.string().optional(),
});

const dataCategoryUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),

  name: z.string().optional(),
  categoryNameTh: z.string().optional(),
  categoryNameEn: z.string().optional(),

  embedCode: z.string().optional(), // ✅ optional สำหรับ update
  linkUrl: z.string().optional()
});

const dataCategoryDeleteSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
});

async function isBasicAuthValid(req: Request): Promise<{ valid: boolean; userId?: string }> {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return { valid: false };

  const [username, password] = Buffer.from(auth.split(" ")[1], "base64")
    .toString("utf-8")
    .split(":");

  const foundUser = await prisma.user.findFirst({
    where: { username, isActive: true },
  });

  if (!foundUser || !foundUser.isActive) return { valid: false };

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordValid) return { valid: false };

  return { valid: true, userId: foundUser.id }; // ✅ ส่ง uid กลับ
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
    const routes = await prisma.dataPage.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createAt: "desc"
      }
    });
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
  // 🔐 Basic Auth
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const userId = authResult.userId!; // ใช้ ! เพราะผ่าน valid แล้วแน่นอน

  // 📦 ตรวจขนาด payload
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return Response.json({ error: "Payload Must Not Exceed 1MB" }, { status: 413 });
  }

  // 🚦 Rate limit
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // 🧩 Parse + validate body
    const body = await req.json();
    const parseResult = dataCategorySchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, categoryNameTh, categoryNameEn, embedCode, linkUrl } = parseResult.data;

    // 🧠 Save to DB
    const newCategory = await prisma.dataPage.create({
      data: {
        name,
        categoryNameTh,
        categoryNameEn,
        embedCode,
        linkUrl,
        createBy: userId,
      },
    });

    // 🎉 Success
    return Response.json(
      {
        status: "success",
        message: "Category created successfully",
        data: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create data category:", error);
    return Response.json(
      {
        status: "error",
        message: "Failed to create data category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Edit Category
export async function PUT(req: Request) {
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const userId = authResult.userId!; // ดึงจาก auth
  const contentLength = req.headers.get("content-length");
  
  // 📦 Check payload size
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  // 🚦 Rate limit
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // 🧩 Parse + Validate
    const body = await req.json();
    const parseResult = dataCategoryUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id, name, categoryNameTh, categoryNameEn, embedCode, linkUrl } = parseResult.data;

    // 🔍 Check if record exists
    const categoryExists = await prisma.dataPage.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    // 🧠 Update record
    const updatedCategory = await prisma.dataPage.update({
      where: { id },
      data: {
        name,
        categoryNameTh,
        categoryNameEn,
        embedCode,
        linkUrl,
        updateBy: userId, // ✅ override จาก auth
        updateAt: new Date(),
      },
    });

    return Response.json(
      { message: "Data category updated successfully", data: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update data category:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Delete Category
export async function DELETE(req: Request) {
  const authResult = await isBasicAuthValid(req);

  if (!authResult.valid) return unauthorizedResponse();
  
  const userId = authResult.userId!; // ดึงจาก auth

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
    const categoryExists = await prisma.dataPage.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }

    // Soft Delete
    const deletedCategory = await prisma.dataPage.update({
      where: { id },
      data: {
        isActive: false,
        deleteBy: userId,
        deleteAt: new Date(),
      }
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
