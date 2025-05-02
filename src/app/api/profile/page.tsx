"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function ProfilePage() {
  const [token, setToken] = useState(null);
  interface BasicInfo {
    firstname_TH: string;
    lastname_TH: string;
    student_id: string;
    organization_name_TH: string;
    cmuitaccount: string;
  }

  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the token
        const tokenResponse = await fetch("/api/getToken");
        if (!tokenResponse.ok) {
          if (tokenResponse.status === 401) {
            // Redirect to login page if unauthorized
            router.push("/api/login");
            return;
          }
          throw new Error(`Token fetch error: ${tokenResponse.status}`);
        }
        
        const tokenData = await tokenResponse.json();
        setToken(tokenData);
        
        // Fetch user's basic info using the token
        const basicInfoResponse = await fetch("/api/getUserInfo", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!basicInfoResponse.ok) {
          throw new Error(`API error: ${basicInfoResponse.status}`);
        }
        
        const userData = await basicInfoResponse.json();
        setBasicInfo(userData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError("Failed to load profile data: " + errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = () => {
    // Use router instead of direct link to prevent automatic navigation
    router.push('/api/auth/logout');
  };

  if (loading) {
    return <div className={styles.profileContainer}>Loading profile data...</div>;
  }

  if (error) {
    return <div className={styles.profileContainer}>
      <div className={styles.error}>Error: {error}</div>
    </div>;
  }

  if (!basicInfo) {
    return <div className={styles.profileContainer}>No profile data available</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div>
        {/* Show Token */}
        <h2>Access Token:</h2>
        <pre className={styles.codeBlock}>{JSON.stringify(token, null, 2)}</pre>
        <hr />
        
        {/* Show Basic Info */}
        <h2>Basic Info:</h2>
        <pre className={styles.codeBlock}>
          {JSON.stringify(basicInfo, null, 2)}
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
        
        {/* <div>
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
        </div>
        <hr /> */}
        
        {/* Use button instead of Link for logout */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}