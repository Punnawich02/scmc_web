import { prisma } from '../../../backend/client'; // Adjust the import path as necessary
import dotenv from 'dotenv';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });






export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
        user_name,
        user_age,               
        user_address,    
        user_phone,      
        user_occupation, 
        user_cardid,              
        user_reason,     
    } = body

    const newUser = await prisma.userInfo.create({
      data: {
        user_name,
        user_age,               
        user_address,    
        user_phone,      
        user_occupation, 
        user_cardid,              
        user_reason,     
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating accident:', error)
    return NextResponse.json({ error: 'Failed to create accident' }, { status: 500 })
  }
}
