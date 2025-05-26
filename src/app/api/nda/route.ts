import { PrismaClient } from '../../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

// Get all forms
export async function GET() {
  return Response.json(await prisma.nDA.findMany())
}

// Create a new NDA
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert string values to appropriate types
    const NDA_Data = {
      form_id: data.form_id || "",
      accepted: data.accepted || false,
    };

    const nda = await prisma.nDA.create({
      data: NDA_Data
    });

    return NextResponse.json({ nda_id: nda.nda_id }, { status: 201 });
  } catch (error) {
    console.error('Error creating NDA:', error);
    return NextResponse.json(
      { error: 'Failed to create NDA', details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
