import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
