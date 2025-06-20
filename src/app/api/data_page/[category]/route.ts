import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get embed code in that category
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

    const category = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const categories_id = category.id;

    const schedule = await prisma.dataEmbed.findMany({
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

// New embed code in that category
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
    const { title, embedCode } = await req.json();

    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });

    const categoryId = categories?.id;

    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Transit category not found" },
        { status: 404 }
      );
    }

    const newPost = await prisma.dataEmbed.create({
      data: {
        categoryId,
        title,
        embedCode
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

// Update embed code in that category
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
    const { title, embedCode } = await req.json();

    // Find the category
    const categories = await prisma.dataCategory.findUnique({
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
    const existingService = await prisma.dataEmbed.findFirst({
      where: { categoryId: categoryId },
    });

    if (!existingService) {
      return Response.json(
        { error: "No transit service found for this category" },
        { status: 404 }
      );
    }

    const updateEmbed = await prisma.dataEmbed.update({
      where: { id: existingService.id },
      data: {
        title,
        embedCode
      },
    });

    return Response.json(updateEmbed);
  } catch (error) {
    console.error("Error updating transit service:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
