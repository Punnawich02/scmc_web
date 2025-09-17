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
  link_url: z.string().url("link_url ต้องเป็น URL"),
  createBy: z.string().min(1),
});
const publicationUpdateSchema = z.object({
  id: z.number(),
  titleTh: z.string().min(1),
  titleEn: z.string().min(1),
  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  link_url: z.string().url(),
  editBy: z.string().min(1),
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
    const isUsernameValid = (await username) === validUsername;
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

// Get all Public Doc
export async function GET() {
  try {
    const routes = await prisma.publication.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: "desc" },
    });
    return Response.json(routes);
  } catch {
    console.error("Failed to fetch publication Doc:");
    return Response.json(
      { error: "Failed to fetch publication Doc" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post new Public Doc
export async function POST(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

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

  const parseResult = publicationSchema.safeParse(await req.json());

  if (!parseResult.success) {
    return Response.json(
      { error: "Validation failed", details: parseResult.error.format() },
      { status: 400 }
    );
  }

  try {
    const {
      titleTh,
      titleEn,
      descriptionTh,
      descriptionEn,
      link_url,
      createBy,
    } = parseResult.data;
    const newDoc = await prisma.publication.create({
      data: {
        titleTh,
        titleEn,
        descriptionTh,
        descriptionEn,
        linkUrl: link_url,
        createBy,
      },
    });
    return Response.json(newDoc);
  } catch (error) {
    console.error("Failed to create new Public Document:", error);

    return Response.json(
      {
        error: "Error occurred",
        details: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update new public doc
export async function PUT(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

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
      link_url,
      editBy,
    } = await parseResult.data;

    const docExists = await prisma.publication.findUnique({ where: { id } });
    if (!docExists)
      return Response.json({ error: "Document not found" }, { status: 404 });

    const updatedDoc = await prisma.publication.update({
      where: {
        id: id,
      },
      data: {
        titleTh,
        titleEn,
        descriptionTh,
        descriptionEn,
        linkUrl: link_url,
        editBy,
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
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

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
    const { id } = await req.json();

    const docExists = await prisma.publication.findUnique({ where: { id } });
    if (!docExists)
      return Response.json({ error: "Document not found" }, { status: 404 });

    const deletedDoc = await prisma.publication.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    return Response.json(deletedDoc);
  } catch {
    console.error("Failed to delete Public Document:");
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
