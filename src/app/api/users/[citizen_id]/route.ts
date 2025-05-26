
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient();

// Get user by citizen_ID
export async function GET(
  req: Request,
  { params }: { params: { citizen_id: string } },
) {
  try {
    // Find user by citizen_id
    const user = await prisma.users.findFirst({
      where: { citizen_id: params.citizen_id },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect(); // Always disconnect to avoid connection leaks
  }
}

// Update user by citizen_ID
export async function PUT(
    req: Request,
    { params }: { params: { citizen_id: string } },
    ) {
    try {
        const data = await req.json();
    
        // First, find the user by citizen_id to get the user_id
        const user = await prisma.users.findFirst({
            where: { citizen_id: params.citizen_id },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Update user by user_id
        const updatedUser = await prisma.users.update({
            where: { user_id: user.user_id },
            data: {
                prefix: data.prefix,
                name: data.name,
                age: parseInt(data.age) || 0, // Convert to integer with fallback
                house_no: data.house_no || "",
                village: data.village || "",
                road: data.road || "",
                sub_district: data.subdistrict || "",
                district: data.district || "",
                province: data.province || "",
                telephone: data.telephone || "",
                currently: data.currently || ""
            }
        });

        return Response.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return new Response(JSON.stringify({ error: 'Failed to update user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await prisma.$disconnect(); // Always disconnect to avoid connection leaks
    }
    }