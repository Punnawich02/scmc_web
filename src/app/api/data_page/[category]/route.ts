import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

// Get embed code in that category
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const DataCategory = category;
    
    const categoryRecord = await prisma.dataCategory.findUnique({
      where: { name: DataCategory },
    });
    
    if (!categoryRecord) {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }
    
    const categories_id = categoryRecord.id;
    const schedule = await prisma.dataEmbed.findMany({
      where: { categoryId: Number(categories_id) },
    });
    
    return Response.json(schedule);
  } catch (error) {
    console.error("Error fetching data category:", error);
    return Response.json(
      {
        error: "Failed to fetch data category",
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
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const categoryName = category;
    
    const { title, embedCode } = await request.json();
    
    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });
    
    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
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
    console.error("Error creating embed:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update embed code in that category
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const categoryName = category;
    
    const { title, embedCode } = await request.json();
    
    // Find the category
    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });
    
    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }
    
    // Find the first embed in the category to update
    const existingEmbed = await prisma.dataEmbed.findFirst({
      where: { categoryId: categoryId },
    });
    
    if (!existingEmbed) {
      return Response.json(
        { error: "No embed found for this category" },
        { status: 404 }
      );
    }
    
    const updateEmbed = await prisma.dataEmbed.update({
      where: { id: existingEmbed.id },
      data: {
        title,
        embedCode
      },
    });
    
    return Response.json(updateEmbed);
  } catch (error) {
    console.error("Error updating embed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Delete embed code
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;
    const categoryName = category;
    
    // Find the category
    const categories = await prisma.dataCategory.findUnique({
      where: { name: categoryName },
    });
    
    const categoryId = categories?.id;
    if (typeof categoryId !== "number") {
      return Response.json(
        { error: "Data category not found" },
        { status: 404 }
      );
    }
    
    // Find the first embed in the category to delete
    const existingEmbed = await prisma.dataEmbed.findFirst({
      where: { categoryId: categoryId },
    });
    
    if (!existingEmbed) {
      return Response.json(
        { error: "No embed found for this category" },
        { status: 404 }
      );
    }
    
    const deletedEmbed = await prisma.dataEmbed.delete({
      where: { id: existingEmbed.id }
    });
    
    return Response.json(deletedEmbed);
  } catch (error) {
    console.error("Error deleting embed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
