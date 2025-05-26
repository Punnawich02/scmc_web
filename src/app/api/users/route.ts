import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

// Get all users
export async function GET() {
    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
        { error: 'Failed to fetch users', details: (error as Error).message },
        { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert string values to appropriate types
    const userData = {
      prefix: data.prefix,
      name: data.name,
      age: parseInt(data.age) || 0, // Convert to integer with fallback
      house_no: data.house_number || "",
      village: data.village_number || "",
      road: data.road || "",
      sub_district: data.subdistrict || "",
      district: data.district || "",
      province: data.province || "",
      telephone: data.telephone || "",
      currently: data.currently || "",
      citizen_id: data.citizen_id || ""
    };

    const user = await prisma.users.create({
      data: userData
    });

    return NextResponse.json({ user_id: user.user_id }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}