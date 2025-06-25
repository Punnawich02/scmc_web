import { prisma } from "../../lib/prisma";

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

// Get all Data Category
export async function GET() {
  try {
    const routes = await prisma.dataCategory.findMany();
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

// Post new Category
export async function POST(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();
  try {
    const { name, description, displayNameTh, displayNameEn } =
      await req.json();
    const newPost = await prisma.dataCategory.create({
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn,
      },
    });
    return Response.json(newPost);
  } catch (error) {
    console.error("Failed to create transit category:", error);

    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Edit Category
export async function PUT(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();
  try {
    const { id, name, description, displayNameTh, displayNameEn } =
      await req.json();

    const updatedPost = await prisma.dataCategory.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn,
      },
    });

    return Response.json(updatedPost);
  } catch (error) {
    console.error("Failed to update transit category:", error);

    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Category
export async function DELETE(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();
  try {
    const { id } = await req.json();

    const deletedPost = await prisma.dataCategory.delete({
      where: {
        id: id,
      },
    });

    return Response.json(deletedPost);
  } catch (error) {
    console.error("Failed to delete transit category:", error);

    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
