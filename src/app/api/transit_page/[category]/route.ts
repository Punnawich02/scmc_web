import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET all route category
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { category: string };
  }
) {
  try {
    const categoryName = params.category;

    const category = await prisma.transitCategory.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const categories_id = category.id;

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
  req: Request,
  {
    params,
  }: {
    params: { category: string };
  }
) {
  try {
    const categoryName = params.category;
    const { imageUrl, title, uploadBy } = await req.json();

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
  req: Request,
  {
    params,
  }: {
    params: { category: string };
  }
) {
  try {
    const categoryName = params.category;
    const { imageUrl, title, uploadBy } = await req.json();

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
