"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useLocale, useTranslations } from "next-intl";

export default function ProfilePage() {
  const t = useTranslations("UserProfile");
  const locale = useLocale();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState(null);

  interface BasicInfo {
    itaccounttype_EN: string;
    itaccounttype_TH: string;
    organization_name_EN: string;
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

  if (loading) {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
        <Header title={t("page_title")} />
        <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
          Loadind profile data...
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
        <Header title={t("page_title")} />
        <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
          Error : {error}
        </main>
        <Footer />
      </div>
    );
  }

  if (!basicInfo) {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
        <Header title={t("page_title")} />
        <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
          No data available.
        </main>
        <Footer />
      </div>
    );;
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
        <div className="flex flex-col bg-[#6869AA] rounded-lg p-4 w-[80%]">
          <div className="flex items-center">
            <h2 className="text-white text-start min-h-[3rem] font-bold w-[30%]">
              {t("name")}{" "}
            </h2>
            <h2 className="text-white text-center min-h-[3rem]">
              {locale === "th"
                ? basicInfo.firstname_TH
                : basicInfo.firstname_EN}{" "}
              {locale === "th" ? basicInfo.lastname_TH : basicInfo.lastname_EN}
            </h2>
          </div>
          <div className="flex items-center">
            <h2 className="text-white text-start min-h-[3rem] font-bold w-[30%]">
              {t("id")}{" "}
            </h2>
            <h2 className="text-white text-center min-h-[3rem]">
              {basicInfo.student_id}
            </h2>
          </div>
          <div className="flex items-center">
            <h2 className="text-white text-start min-h-[3rem] font-bold w-[30%]">
              {t("fac")}{" "}
            </h2>
            <h2 className="text-white text-center min-h-[3rem]">
              {locale === "th"
                ? basicInfo.organization_name_TH
                : basicInfo.organization_name_EN}
            </h2>
          </div>
          <div className="flex items-center">
            <h2 className="text-white text-start min-h-[3rem] font-bold w-[30%]">
              {t("status")}{" "}
            </h2>
            <h2 className="text-white text-center min-h-[3rem]">
              {locale === "th"
                ? basicInfo.itaccounttype_TH
                : basicInfo.itaccounttype_EN}
            </h2>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer transition duration-300 ease-in-out w-[80%]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}
