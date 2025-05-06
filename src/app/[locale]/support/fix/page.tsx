"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const SupportFixPage = () => {
  const t = useTranslations("FixPage");
  const locale = useLocale();

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

  if (!token) {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
        <Header title="" />
        <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
          <Link
            href="/api/login"
            className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10"
          >
            <button className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 hover:cursor-pointer transition duration-200 ease-in-out">
              Login
            </button>
          </Link>
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
    );
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log("Form data:", data);
      alert(
        "ชื่อผู้แจ้ง: " +
          basicInfo.firstname_TH +
          " " +
          basicInfo.lastname_TH +
          "\nEmail ผู้แจ้ง: " +
          basicInfo.cmuitaccount +
          "\nสังกัด: " +
          basicInfo.organization_name_TH +
          "\nสถานะ: " +
          basicInfo.itaccounttype_TH +
          "\nหมวดหมู่ซ่อม: " +
          data.repairCategory +
          "\nรายละเอียด: " +
          data.details +
          "\nตำแหน่ง: " +
          data.position +
          "\nข้อมูลที่กรอกจะถูกส่งไปยังผู้ดูแลระบบเพื่อดำเนินการต่อไป"
      );
    } catch (error) {
      console.error("Error processing form data:", error);
    }
  };

  const handleLogout = () => {
    // Use router instead of direct link to prevent automatic navigation
    router.push("/api/auth/logout");
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <div className="flex flex-col gap-4 mb-2">
            <h1 className="text-2xl font-bold">{t("inform")}</h1>
            <div>
              <label className="mr-2">{t("name")}: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={locale==='th' ? basicInfo.firstname_TH + " " + basicInfo.lastname_TH : basicInfo.firstname_EN + " " + basicInfo.lastname_EN}
                className="w-[15rem]"
                readOnly
              />

              <label className="mr-2">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                value={basicInfo.cmuitaccount}
                readOnly
                className="w-[20rem]"
              />
            </div>
            <div>
              <label className="mr-2">{t("organization")}: </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={locale==='th' ? basicInfo.organization_name_TH : basicInfo.organization_name_EN}
                readOnly
              />
              <label className="mr-2">{t("account")}: </label>
              <input
                type="text"
                id="status"
                name="status"
                value={locale==='th' ? basicInfo.itaccounttype_TH : basicInfo.itaccounttype_EN}
                readOnly
              />
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 hover:cursor-pointer transition duration-200 ease-in-out mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-2xl font-bold">{t("detail")}</h1>
            <div className="flex flex-col gap-4">
              <label className="mr-2">{t("repairCategory")}</label>
              <select
                id="repairCategory"
                name="repairCategory"
                className="border-2 border-gray-300 rounded-xl p-2"
              >
                <option value="hardware">{t("hardware")}</option>
                <option value="software">{t("software")}</option>
                <option value="network">{t("network")}</option>
                <option value="other">{t("other")}</option>
              </select>
              <label className="mr-2">{t("band")}</label>
              <input
                type="text"
                id="band"
                name="band"
                className="border-2 border-gray-300 rounded-xl p-2"
              />
              <label className="mr-2">{t("repair_title")}</label>
              <textarea
                id="details"
                name="details"
                className="border-2 border-gray-300 rounded-xl p-2 w-full h-32 resize-none"
              ></textarea>
              <label className="mr-2">{t("position")}</label>
              <input
                type="text"
                id="position"
                name="position"
                className="border-2 border-gray-300 rounded-xl p-2"
              />
            </div>
          </div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 hover:cursor-pointer transition duration-200 ease-in-out mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SupportFixPage;
