import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

// GET all route category
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const TransitCategory = category;

    const categoryRecord = await prisma.dataCategory.findUnique({
      where: { name: TransitCategory },
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
    return new Response(error as BodyInit, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Update(PUT) Time table on that Category
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
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

    // Option 1: Update the first transit service in the category
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
      where: { id: existingService.id }, // Use the service ID, not categoryId
      data: {
        imageUrl,
        title,
        uploadBy,
      },
    });

    return Response.json(updateTransitService);
  } catch (error) {
    console.error("Error updating transit service:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
