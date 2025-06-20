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
    const { title, description, link_url } = await req.json();
    const newDoc = await prisma.publication.create({
      data: {
        title,
        description,
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
