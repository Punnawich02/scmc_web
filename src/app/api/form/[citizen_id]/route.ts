import { PrismaClient } from "../../../../generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get forms by citizen_id
export async function GET(
  req: Request,
  { params }: { params: { citizen_id: string } }
) {
  try {
    // Find user by citizen_id to get user_id
    const user = await prisma.users.findFirst({
      where: { citizen_id: params.citizen_id },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get latest form for the user
    const latestForm = await prisma.form.findFirst({
      where: {
        user_id: user.user_id,
      },
      orderBy: {
        created_at: "desc", // Order by creation date in descending order
      },
    });

    return NextResponse.json(latestForm);
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms", details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
