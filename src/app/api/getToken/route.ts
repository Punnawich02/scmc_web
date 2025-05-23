// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { getToken } from "../../lib/session";

// export async function GET() {
//   const cookieStore = cookies();
//   const token = getToken(await cookieStore);

//   if (!token) {
//     return NextResponse.json({ error: "No token found" , valid: false}, { status: 401 });
//   }

//   return NextResponse.json({ ...token, valid: true });
// }

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const token = request.cookies.get("access_token")?.value;

//   if (token) {
//     // ตรวจสอบ token ที่นี่ถ้าอยากเพิ่ม validation (เช่น JWT verify)
//     return NextResponse.json({ success: true });
//   } else {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getToken } from '../../lib/session';

export async function GET() {
  const cookieStore = cookies();
  const token = getToken(await cookieStore);
  if (!token) {
    return NextResponse.json({ valid: false, error: 'No token found' }, { status: 401 });
  }

  return NextResponse.json({ valid: true, token });
}

