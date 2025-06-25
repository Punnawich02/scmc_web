import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function isBasicAuthValid(req: Request): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const encoded = auth.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  const validUsername = process.env.AUTH_USERNAME;
  const validPassword = process.env.AUTH_PASSWORD;

  return username === validUsername && password === validPassword;
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
    const routes = await prisma.publication.findMany();
    return Response.json(routes);
  } catch (error) {
    console.error("Failed to fetch publication Doc:", error);
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
  try {
    const { titleTh, titleEn, descriptionTh, descriptionEn, link_url } =
      await req.json();
    const newDoc = await prisma.publication.create({
      data: {
        titleTh,
        titleEn,
        descriptionTh,
        descriptionEn,
        linkUrl: link_url,
      },
    });
    return Response.json(newDoc);
  } catch (error) {
    console.error("Failed to create new Public Document:", error);

    return Response.json(
      {
        error: "Error occurred",
        details: String(error),
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
  try {
    const { id, titleTh, titleEn, descriptionTh, descriptionEn, link_url } =
      await req.json();

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
      },
    });

    return Response.json(updatedDoc);
  } catch (error) {
    console.error("Failed to update Public Document:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: String(error),
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
  try {
    const { id } = await req.json();

    const deletedDoc = await prisma.publication.delete({
      where: {
        id: id,
      },
    });

    return Response.json(deletedDoc);
  } catch (error) {
    console.error("Failed to delete Public Document:", error);
    return Response.json(
      {
        error: "Error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
