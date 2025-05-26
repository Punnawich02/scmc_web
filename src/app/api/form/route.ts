import { PrismaClient } from '../../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

// Get all forms
export async function GET() {
  return Response.json(await prisma.form.findMany())
}

// Create a new form
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const form = await prisma.form.create({
      data: {
        user_id: data.user_id,
        request_reason: data.request_reason || "",
        accident_area: data.accident_area || "",
        accident_date: data.accident_date || "",
        accident_time: data.accident_time || "",
        security_noti_date: data.security_noti_date || "",
        police_noti_date: data.police_noti_date || "",
        police_noti_time: data.police_noti_time || "",
        cctv_area_request1: data.cctv_area_request1 || "",
        cctv_area_request2: data.cctv_area_request2 || "",
        cctv_area_request3: data.cctv_area_request3 || "",
      }
    });

    return NextResponse.json({ form_id: form.form_id }, { status: 201 });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json(
      { error: 'Failed to create form', details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
