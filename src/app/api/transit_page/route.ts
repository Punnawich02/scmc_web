import { prisma } from '../../lib/prisma'

// Get All Transit Route Categories
export async function GET() {
    try {
        const routes = await prisma.transitCategory.findMany();
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

// Post new Transit Categories (Transit Route)
export async function POST(req: Request) {
  try {
    const { name, display_name_th, display_name_en } = await req.json()
    const newPost = await prisma.transitCategory.create({
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en
      },
    })
    return Response.json(newPost)
  } catch (error) {
    console.error('Failed to create transit category:', error);
    
    // จัดการ error แบบเฉพาะเจาะจง
    if (error instanceof Error) {
      return Response.json(
        { 
          error: 'Failed to create transit category, Something Missing',  
        },
        { status: 500 }
      );
    }
    
    // กรณีไม่เข้าเงื่อนไข instanceof Error
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

// Update Transit Categories (Transit Route)
export async function PUT(req: Request) {
  try {
    const { id, name, display_name_th, display_name_en } = await req.json()
    
    const updatedPost = await prisma.transitCategory.update({
      where: {
        id: id
      },
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en
      },
    })
    
    return Response.json(updatedPost)
  } catch (error) {
    console.error('Failed to update transit category:', error);
    
    // จัดการ error แบบเฉพาะเจาะจง
    if (error instanceof Error) {
      return Response.json(
        { 
          error: 'Failed to update transit category, Something Missing',  
        },
        { status: 500 }
      );
    }
    
    // กรณีไม่เข้าเงื่อนไข instanceof Error
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

// Delete Transit Categories (Transit Route)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    
    const deletedPost = await prisma.transitCategory.delete({
      where: {
        id: id
      }
    })
    
    return Response.json(deletedPost)
  } catch (error) {
    console.error('Failed to delete transit category:', error);
    
    // จัดการ error แบบเฉพาะเจาะจง
    if (error instanceof Error) {
      return Response.json(
        { 
          error: 'Failed to delete transit category, Something Missing',  
        },
        { status: 500 }
      );
    }
    
    // กรณีไม่เข้าเงื่อนไข instanceof Error
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
