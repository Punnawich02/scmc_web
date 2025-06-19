// app/api/news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const newsUrl = process.env.NEWS_CMU_API;
  const all_news = process.env.COUNT_NEWS_CMU_API;
  
  if (!newsUrl) {
    return NextResponse.json({ error: 'News URL not configured' }, { status: 500 });
  }
  if (!all_news) {
    return NextResponse.json({ error: 'Count news URL not configured' }, { status: 500 });
  }
  
  try {
    const count_news_res = await fetch(all_news);
    
    if (!count_news_res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch news' }, 
        { status: count_news_res.status }
      );
    }
    const count_news = await count_news_res.json();
    const response = await fetch(`${newsUrl}/${count_news}`);
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