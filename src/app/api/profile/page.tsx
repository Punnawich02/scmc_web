// This is a server component
// It runs on the server and can access server-side resources like cookies, headers, etc.
'ues strict';

import { cookies } from "next/headers";
import { getToken } from "../../lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "../page.module.css";

// Make sure server cache this page for 60 seconds
export const dynamic = "auto";
export const revalidate = 60;

export default async function ProfilePage() {
  // Get data from cookies
  const cookieStore = cookies();
  const token = getToken(await cookieStore);

  if (!token) {
    // Redirect to login page if no token
    redirect("/api/login");
  }

  // Fetch user's basic info
  let basicInfo = null;
  let error = null;

  try {
    const response = await fetch(process.env.BASICINFO_URL!, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    basicInfo = await response.json();
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    error = "Failed to load profile data";
  }

  return (
    <div className={styles.profileContainer}>
      {error && <div className={styles.error}>Error: {error}</div>}

      <div>
        {/* Show Token */}
        <h2>Access Token:</h2>
        <pre className={styles.codeBlock}>{JSON.stringify(token, null, 2)}</pre>
        <hr />

        {/* Show Basic Info */}
        <h2>Basic Info:</h2>
        <pre className={styles.codeBlock}>
          {basicInfo ? JSON.stringify(basicInfo, null, 2) : "Loading..."}
        </pre>
        <hr />

        {/* Example to show a value from api */}
        <div>
          <h2>Profile</h2>
          <p>
            ชื่อ-สกุล: {basicInfo.firstname_TH + " " + basicInfo.lastname_TH}
          </p>
          <p>รหัสนักศึกษา: {basicInfo.student_id}</p>
          <p>คณะ: {basicInfo.organization_name_TH}</p>
          <p>CMU Mail: {basicInfo.cmuitaccount}</p>
        </div>
        <hr />

        <div>
          <h2>From</h2>
          <div>
            <label htmlFor="from">ชื่อ-สกุล:</label>
            <input
              type="text"
              id="name"
              name="from"
              value={basicInfo.firstname_TH + " " + basicInfo.lastname_TH}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="from">รหัสนักศึกษา:</label>
            <input
              type="text"
              id="id"
              name="from"
              value={basicInfo.student_id}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="from">ส่วนสูง:</label>
            <input type="text" id="height" name="from" />
            <label htmlFor="from">น้ำหนัก:</label>
            <input type="text" id="weight" name="from" />
          </div>
          {/* <div>
            <button type="button" onClick={calculate} className={styles.submitButton}>
              Calculate
            </button>
          </div> */}
        </div>
        <hr />

        <Link href="/api/auth/logout" className={styles.logoutButton}>
          Logout
        </Link>
      </div>
    </div>
  );
}
