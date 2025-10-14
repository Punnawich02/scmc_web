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
const userSchema = z.object({
  fname: z.string().min(1, "fname ต้องไม่ว่าง"),
  lname: z.string().min(1, "lname ต้องไม่ว่าง"),
  
  username: z.string().min(1, "username ต้องไม่ว่าง"),
  password: z.string().min(1, "password ต้องไม่ว่าง"),
});

const userUpdateSchema = z.object({
  id: z.string().optional(),
  fname: z.string().optional(),
  lname: z.string().optional(),
  
  password: z.string().optional(),

  isActive: z.boolean().optional(),
});

const userDeleteSchema = z.object({
    id: z.string().min(1,'id ต้องไม่ว่าง'),
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

// Post new Admin
export async function POST(req: Request) {
  // 🔐 Basic Auth
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const adminId = authResult.userId!;

  // 📦 ตรวจขนาด payload
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return Response.json({ error: "Payload must not exceed 1MB" }, { status: 413 });
  }

  // 🚦 Rate limit
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // 🧩 Parse + validate body
    const body = await req.json();
    const parseResult = userSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json({ error: "Validation failed", details: parseResult.error.format() }, { status: 400 });
    }

    const { fname, lname, username, password } = parseResult.data;

    // 🔍 Check if username already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return Response.json({ error: "Username already exists" }, { status: 409 });
    }

    // 🔑 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧠 Save to DB
    const newAdmin = await prisma.user.create({
      data: {
        fname,
        lname,
        username,
        password: hashedPassword,
        createBy: adminId,
        createAt: new Date(),
      },
    });

    const { password: _, ...safeAdmin } = newAdmin;

    return Response.json({
      status: "success",
      message: "Admin created successfully",
      data: safeAdmin,
    }, { status: 201 });

  } catch (error) {
    console.error("Failed to create new admin:", error);
    return Response.json({
      status: "error",
      message: "Failed to create new admin",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

// Edit Admin info
export async function PUT(req: Request) {
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const userId = authResult.userId!;
  const contentLength = req.headers.get("content-length");

  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return Response.json({ error: "Payload must not exceed 1MB" }, { status: 413 });
  }

  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parseResult = userUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json({ error: "Validation failed", details: parseResult.error.format() }, { status: 400 });
    }

    const { id, fname, lname, password } = parseResult.data;

    // 🔍 Check if record exists
    const userExists = await prisma.user.findUnique({ where: { id: id ?? userId } });
    if (!userExists) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 🔑 Hash password ถ้ามี
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 🧠 Build dynamic update object
    const updateData: any = {
      updateBy: userId,
      updateAt: new Date(),
    };
    if (fname) updateData.fname = fname;
    if (lname) updateData.lname = lname;
    if (hashedPassword) updateData.password = hashedPassword;

    const updatedUser = await prisma.user.update({
      where: { id: id ?? userId },
      data: updateData,
    });

    // 🔒 Return response without password
    const { password: _, ...safeUser } = updatedUser;

    return Response.json({
      status: "success",
      message: "User updated successfully",
      data: safeUser,
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to update user:", error);
    return Response.json({
      error: "Error occurred",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

// Delete Category
export async function DELETE(req: Request) {
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const adminId = authResult.userId!; // ดึงจาก auth

  // 📦 Check payload size
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return Response.json({ error: "Payload must not exceed 1MB" }, { status: 413 });
  }

  // 🚦 Rate limit
  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // 🧩 Parse + validate body
    const body = await req.json();
    const parseResult = userDeleteSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json({ error: "Validation failed", details: parseResult.error.format() }, { status: 400 });
    }

    const { id } = parseResult.data;

    if (!id) {
      return Response.json({ error: "Missing user id" }, { status: 400 });
    }

    // 🔍 Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 🧠 Soft delete
    const deletedUser = await prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        deleteBy: adminId,
        deleteAt: new Date(),
      },
    });

    return Response.json({
      status: "success",
      message: "User deleted successfully",
      data: deletedUser,
    }, { status: 200 });

  } catch (error) {
    console.error("Failed to delete user:", error);
    return Response.json({
      status: "error",
      message: "Failed to delete user",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
