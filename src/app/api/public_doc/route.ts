import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  try {
    const { titleTh, titleEn, descriptionTh, descriptionEn, link_url } = await req.json();
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
  try {
    const { id, titleTh, titleEn, descriptionTh, descriptionEn, link_url } = await req.json();
    
    const updatedDoc = await prisma.publication.update({
      where: {
        id: id
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
  try {
    const { id } = await req.json();
    
    const deletedDoc = await prisma.publication.delete({
      where: {
        id: id
      }
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
