import { getToken } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = cookies();
  const token = getToken(await cookieStore);
  if (token) {
    // Redirect to profile page if token exists
    redirect("/api/profile");
  }
  const auth_url = process.env.AUTH_URL;
  const client_id = process.env.CLIENT_ID;
  const callback_url = process.env.CALLBACK_URL;
  const scope = process.env.SCOPE;

  const authUrl = `${auth_url}?client_id=${client_id}&response_type=code&redirect_uri=${callback_url}&scope=${scope}`;
  
  redirect(authUrl);
}
