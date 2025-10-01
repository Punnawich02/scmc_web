import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://scmc.cmu.ac.th/web/privacy/content?1750390260",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const content = await response.text();

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return NextResponse.json(
      { error: "Failed to fetch privacy policy" },
      { status: 500 }
    );
  }
}
