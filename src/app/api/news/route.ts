// app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const newsUrl = process.env.NEXT_PUBLIC_NEWS_URL;
  
  if (!newsUrl) {
    return NextResponse.json({ error: 'News URL not configured' }, { status: 500 });
  }
  
  try {
    const response = await fetch(newsUrl, {
      headers: {
        // Add any required headers for the API
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch news' }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' }, 
      { status: 500 }
    );
  }
}