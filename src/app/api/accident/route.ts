import { prisma } from '../../../backend/client'; // Adjust the import path as necessary
import dotenv from 'dotenv';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      user_id,
      acci_place,
      acci_date,
      acci_time,
      security_contact_date,
      police_contact_date,
      police_contact_time,
    } = body

    const newAccident = await prisma.accidentInfo.create({
      data: {
        user_id,
        acci_place,
        acci_date: new Date(acci_date),
        acci_time: new Date(acci_time),
        security_contact_date: new Date(security_contact_date),
        police_contact_date: new Date(police_contact_date),
        police_contact_time: new Date(police_contact_time),
      },
    })

    return NextResponse.json(newAccident, { status: 201 })
  } catch (error) {
    console.error('Error creating accident:', error)
    return NextResponse.json({ error: 'Failed to create accident' }, { status: 500 })
  }
}
