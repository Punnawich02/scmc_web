"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function ProfilePage() {
  const [token, setToken] = useState(null);
  interface BasicInfo {
    firstname_TH: string;
    lastname_TH: string;
    firstname_EN: string;
    lastname_EN: string;
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
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError("Failed to load profile data: " + errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  const handleLogout = () => {
    // Use router instead of direct link to prevent automatic navigation
    router.push("/api/auth/logout");
  };

  const handleSubmitForm = () => {
    const formElement = document.querySelector("form");
    if (formElement) {
      const formData = new FormData(formElement);
      const data = Object.fromEntries(formData.entries());
      alert(
        "Name: " +
          data.fname +
          " " +
          data.lname +
          "\nEmail: " +
          data.email +
          "\nInput: " +
          data.input
      );
    } else {
      console.error("Form element not found");
    }
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>Loading profile data...</div>
    );
  }

  if (error) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  if (!basicInfo) {
    return (
      <div className={styles.profileContainer}>No profile data available</div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div style={{ fontFamily: "monospace" }}>
        {/* Show Token */}
        <h2>Access Token:</h2>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
            fontSize: "0.9rem",
            fontFamily: "monospace",
          }}
        >
          {JSON.stringify(token, null, 2)}
        </pre>
        <hr />

        {/* Show Basic Info */}
        <div>
          <h2>Basic Info:</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
              overflow: "auto",
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontSize: "0.9rem",
            }}
          >
            {JSON.stringify(basicInfo, null, 2)}
          </pre>
        </div>
        <hr />

        {/* Example to show a value from api */}
        <div>
          <h2>Profile</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
              overflow: "auto",
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
              fontSize: "0.9rem",
            }}
          >
            <p>
              ชื่อ-สกุล: {basicInfo.firstname_TH + " " + basicInfo.lastname_TH}
            </p>
            <p>รหัสนักศึกษา: {basicInfo.student_id}</p>
            <p>คณะ: {basicInfo.organization_name_TH}</p>
            <p>CMU Mail: {basicInfo.cmuitaccount}</p>
          </pre>
        </div>
        <hr />

        {/* Form Testing */}
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
            fontSize: "0.9rem",
          }}
        >
          <h2>Form Testing</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={basicInfo.firstname_EN}
                readOnly
              />

              <label htmlFor="lname" style={{ marginLeft: "1rem" }}>
                Last Name:
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={basicInfo.lastname_EN}
                readOnly
              />
            </div>

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={basicInfo.cmuitaccount}
              readOnly
            />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="input">Input:</label>
            <input type="text" id="input" name="input" required />

            <button type="submit" onClick={handleSubmitForm}>
              Submit
            </button>
          </form>
        </div>

        {/* Use button instead of Link for logout */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
