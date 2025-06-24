import { prisma } from "../../lib/prisma";

// Get all Data Category
export async function GET() {
    try {
        const routes = await prisma.dataCategory.findMany();
        return Response.json(routes);
    } catch (error) {
        console.error('Failed to fetch transit route categories:', error);
        return Response.json(
            { error: 'Failed to fetch transit route categories' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// Post new Category
export async function POST(req: Request) {
  try {
    const { name, description, displayNameTh, displayNameEn } = await req.json()
    const newPost = await prisma.dataCategory.create({
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn
      },
    })
    return Response.json(newPost)
  } catch (error) {
    console.error('Failed to create transit category:', error);
    
    return Response.json(
      { 
        error: 'An unknown error occurred',
        details: String(error) 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Edit Category
export async function PUT(req: Request) {
  try {
    const { id, name, description, displayNameTh, displayNameEn } = await req.json()
    
    const updatedPost = await prisma.dataCategory.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        displayNameTh,
        displayNameEn
      },
    })
    
    return Response.json(updatedPost)
  } catch (error) {
    console.error('Failed to update transit category:', error);
    
    return Response.json(
      { 
        error: 'An unknown error occurred',
        details: String(error) 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Category
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    
    const deletedPost = await prisma.dataCategory.delete({
      where: {
        id: id
      }
    })
    
    return Response.json(deletedPost)
  } catch (error) {
    console.error('Failed to delete transit category:', error);
    
    return Response.json(
      { 
        error: 'An unknown error occurred',
        details: String(error) 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}