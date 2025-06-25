// /api/transit_page/[category]/route.ts
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

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

// GET all route category
export async function GET(
  request: NextRequest,
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
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST new Time table on that Category
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  if (!isBasicAuthValid(request)) return unauthorizedResponse();

  try {
    const { category } = await context.params;
    const categoryName = category;

    const { imageUrl, title, uploadBy } = await request.json();

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
        uploadBy,
      },
    });

    return Response.json(newPost);
  } catch (error) {
    console.error("Error creating transit service:", error);
    return Response.json(
      {
        error: "Failed to create transit service",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update(PUT) Time table on that Category
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  if (!isBasicAuthValid(request)) return unauthorizedResponse();

  try {
    const { category } = await context.params;
    const categoryName = category;

    const { imageUrl, title, uploadBy } = await request.json();

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

    // Find the first transit service in the category to update
    const existingService = await prisma.transitService.findFirst({
      where: { categoryId: categoryId },
    });

    if (!existingService) {
      return Response.json(
        { error: "No transit service found for this category" },
        { status: 404 }
      );
    }

    const updateTransitService = await prisma.transitService.update({
      where: { id: existingService.id },
      data: {
        imageUrl,
        title,
        uploadBy,
      },
    });

    return Response.json(updateTransitService);
  } catch (error) {
    console.error("Error updating transit service:", error);
    return Response.json(
      {
        error: "Failed to update transit service",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Time table on that Category
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  if (!isBasicAuthValid(request)) return unauthorizedResponse();

  try {
    const { category } = await context.params;
    const categoryName = category;

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

    // Find the first transit service in the category to delete
    const existingService = await prisma.transitService.findFirst({
      where: { categoryId: categoryId },
    });

    if (!existingService) {
      return Response.json(
        { error: "No transit service found for this category" },
        { status: 404 }
      );
    }

    const deletedService = await prisma.transitService.delete({
      where: { id: existingService.id },
    });

    return Response.json({
      message: "Transit service deleted successfully",
      deletedService,
    });
  } catch (error) {
    console.error("Error deleting transit service:", error);
    return Response.json(
      {
        error: "Failed to delete transit service",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
