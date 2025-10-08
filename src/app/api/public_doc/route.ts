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

const publicationSchema = z.object({
  titleTh: z.string().min(1, "titleTh ต้องไม่ว่าง"),
  titleEn: z.string().min(1, "titleEn ต้องไม่ว่าง"),

  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  
  linkUrl: z.string().url("linkUrl ต้องเป็น URL"),
});

const publicationUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
  
  titleTh: z.string().min(1, "title ต้องเป็นข้อความเท่านั้น"),
  titleEn: z.string().min(1, "title ต้องเป็นข้อความเท่านั้น"),
  
  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  
  linkUrl: z.string().url("linkUrl ต้องเป็นข้อความ ที่เป็นลิงค์เท่านั้น"),
});

const publicationDeleteSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก")
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

// Get all Public Doc
export async function GET() {
  try {
    const routes = await prisma.publications.findMany({
      where: { 
        isActive: true 
      },
      orderBy: { 
        createAt: "desc" 
      },
    });
    return Response.json(routes);
  } catch {
    console.error("Failed to fetch publication Doc:");
    return Response.json(
      { error: "Failed to fetch publication Doc" },
      { status: 500 }
    );
  }
}

// Post new Public Doc
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
    const parseResult = publicationSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { 
      titleTh, 
      titleEn, 
      descriptionTh,
      descriptionEn, 
      linkUrl,
    } = parseResult.data;

    // 🧠 Save to DB
    const newPublication = await prisma.publications.create({
      data: {
        titleTh,
        titleEn,
        descriptionTh,
        descriptionEn,
        linkUrl,
        createBy: userId,
        createAt: new Date()
      },
    });

    // 🎉 Success
    return Response.json(
      {
        status: "success",
        message: "Publication created successfully",
        data: newPublication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create Publication:", error);
    return Response.json(
      {
        status: "error",
        message: "Failed to create Publcation",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Update new public doc
export async function PUT(req: Request) {
  // 🔐 Basic Auth
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();

  const userId = authResult.userId!; // ใช้ ! เพราะผ่าน valid แล้วแน่นอน

  if (
    req.headers.get("content-length") &&
    parseInt(req.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const parseResult = publicationUpdateSchema.safeParse(await req.json());
  if (!parseResult.success) {
    return Response.json(
      { error: "Validation failed", details: parseResult.error.format() },
      { status: 400 }
    );
  }

  try {
    const {
      id,
      titleTh,
      titleEn,
      descriptionTh,
      descriptionEn,
      linkUrl,
    } = await parseResult.data;

    const docExists = await prisma.publications.findUnique({ where: { id } });
    if (!docExists)
      return Response.json({ error: "Document not found" }, { status: 404 });

    const updatedDoc = await prisma.publications.update({
      where: {
        id: id,
      },
      data: {
        titleTh,
        titleEn,
        descriptionTh,
        descriptionEn,
        linkUrl,
        updateBy: userId,
        updateAt: new Date(),
      },
    });

    return Response.json(updatedDoc);
  } catch {
    console.error("Failed to update Public Document:");
    return Response.json(
      {
        error: "Error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete public doc
export async function DELETE(req: Request) {
  // 🔐 Basic Auth
  const authResult = await isBasicAuthValid(req);
  if (!authResult.valid) return unauthorizedResponse();
  
  const userId = authResult.userId!; // ใช้ ! เพราะผ่าน valid แล้วแน่นอน

  if (
    req.headers.get("content-length") &&
    parseInt(req.headers.get("content-length")!) > MAX_BODY_SIZE
  ) {
    return Response.json(
      { error: "Payload Must Not Exceed 1MB" },
      { status: 413 }
    );
  }

  const rateLimitResult = await limiter(req);
  if (!rateLimitResult.success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const body = await req.json();

    const parseResult = publicationDeleteSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        { error: "Validation failed", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { id } = body;

    const docExists = await prisma.publications.findUnique({ where: { id } });
    if (!docExists)
      return Response.json({ error: "Document not found" }, { status: 404 });
    const deletedDoc = await prisma.publications.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
        deleteBy: userId,
        deleteAt: new Date()
      },
    });

    return Response.json(deletedDoc);
  } catch (err) {
    console.error("Failed to delete Public Document:");
    return Response.json(
    { error: "Error occurred", details: String(err) },
    { status: 500 }
  );
  } finally {
    await prisma.$disconnect();
  }
}
