import { prisma } from "../../lib/prisma";

function isBasicAuthValid(req: Request): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const encoded = auth.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  const validUsername = process.env.AUTH_USERNAME;
  const validPassword = process.env.AUTH_PASSWORD;

  return username === validUsername && password === validPassword;
}

function unauthorizedResponse(): Response {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Get All Transit Route Categories
export async function GET() {
  try {
    const routes = await prisma.transitCategory.findMany();
    return Response.json(routes);
  } catch (error) {
    console.error("Failed to fetch transit route categories:", error);
    return Response.json(
      { error: "Failed to fetch transit route categories" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Post new Transit Categories (Transit Route) With Basic
export async function POST(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

  try {
    const { name, display_name_th, display_name_en, createBy } = await req.json();

    const newCategory = await prisma.transitCategory.create({
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en,
        createBy
      },
    });

    return Response.json(newCategory);
  } catch (error) {
    console.error("Failed to create transit category:", error);

    if (error instanceof Error) {
      return Response.json(
        {
          error: "Failed to create transit category",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update Transit Categories (Transit Route)
export async function PUT(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

  try {
    const { id, name, display_name_th, display_name_en, editBy } = await req.json();

    const updatedCategory = await prisma.transitCategory.update({
      where: {
        id: id,
      },
      data: {
        name,
        displayNameTh: display_name_th,
        displayNameEn: display_name_en,
        editBy
      },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    console.error("Failed to update transit category:", error);

    // จัดการ error แบบเฉพาะเจาะจง
    if (error instanceof Error) {
      return Response.json(
        {
          error: "Failed to update transit category, Something Missing",
        },
        { status: 500 }
      );
    }

    // กรณีไม่เข้าเงื่อนไข instanceof Error
    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Transit Categories (Transit Route)
export async function DELETE(req: Request) {
  if (!isBasicAuthValid(req)) return unauthorizedResponse();

  try {
    const { id } = await req.json();

    const deletedCategory = await prisma.transitCategory.delete({
      where: {
        id: id,
      },
    });

    return Response.json(deletedCategory);
  } catch (error) {
    console.error("Failed to delete transit category:", error);

    // จัดการ error แบบเฉพาะเจาะจง
    if (error instanceof Error) {
      return Response.json(
        {
          error: "Failed to delete transit category, Something Missing",
        },
        { status: 500 }
      );
    }

    // กรณีไม่เข้าเงื่อนไข instanceof Error
    return Response.json(
      {
        error: "An unknown error occurred",
        details: String(error),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
