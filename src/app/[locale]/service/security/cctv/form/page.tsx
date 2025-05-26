"use client";
import Header from "../../../../Component/Header";
import Footer from "../../../../Component/Footer";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());
  
  try {
    let userId;
    
    // Check if user exists
    const checkResponse = await fetch(`http://localhost:3000/api/users/${data.citizen_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (checkResponse.ok) {
      // User exists, get their ID
      const userData = await checkResponse.json();
      userId = userData.user_id;
      const updateResponse = await fetch(`http://localhost:3000/api/users/${data.citizen_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: data.prefix || "mr",
          name: data.name,
          age: parseInt(String(data.age)) || 0,
          house_no: data.house_no || "",
          village: data.village || "",
          road: data.road || "",
          sub_district: data.sub_district || "",
          district: data.district || "",
          province: data.province || "",
          telephone: data.telephone || "",
          currently: data.currently || "",
        }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`Failed to update user: ${errorData.details || "Unknown error"}`);
      }
    } else {
      // User doesn't exist, create new user
      const createResponse = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: data.prefix || "mr",
          name: data.name,
          age: parseInt(String(data.age)) || 0,
          house_no: data.house_no || "",
          village: data.village || "",
          road: data.road || "",
          sub_district: data.sub_district || "",
          district: data.district || "",
          province: data.province || "",
          telephone: data.telephone || "",
          currently: data.currently || "",
          citizen_id: data.citizen_id || "",
        }),
      });
      
      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(`Failed to create user: ${errorData.details || "Unknown error"}`);
      }
      
      const userRes = await createResponse.json();
      userId = userRes.user_id;
      console.log("New user created with ID:", userId);
    }
    
    // Create form associated with the user (existing or newly created)
    const response_form = await fetch("http://localhost:3000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        request_reason: data.reason || "",
        accident_area: data.area || "",
        accident_date: data.accident_date || "",
        accident_time: data.accident_time || "",
        security_noti_date: data.security_noti_date || "",
        police_noti_date: data.police_noti_date || "",
        police_noti_time: data.police_noti_time || "",
        cctv_area_request1: data.area_req_1 || "",
        cctv_area_request2: data.area_req_2 || "",
        cctv_area_request3: data.area_req_3 || "",
      }),
    });
    
    if (!response_form.ok) {
      const errorData = await response_form.json();
      throw new Error(`Failed to submit form: ${errorData.details || "Unknown error"}`);
    }
    
    alert("Data submitted successfully!");
  } catch (error) {
    alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.error(error);
  } finally {
    redirect("/th/service/security/cctv/nda");
  }
};

const FormPage = () => {
  const t = useTranslations("CCTVRequestForm");
  const [token, setToken] = useState(null);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const router = useRouter();

  interface BasicInfo {
    firstname_TH: string;
    lastname_TH: string;
    itaccounttype_TH: string;
    student_id: number;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const tokenResponse = await fetch("/api/getToken");
        if (!tokenResponse.ok) {
          if (tokenResponse.status === 401) {
            setToken(null); // ไม่มี token
            return;
          }
          throw new Error(`Token fetch error: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();
        setToken(tokenData); // มี token

        const basicInfoResponse = await fetch("/api/getUserInfo", {
          headers: { "Content-Type": "application/json" },
        });

        if (!basicInfoResponse.ok) {
          throw new Error(`API error: ${basicInfoResponse.status}`);
        }

        const userData = await basicInfoResponse.json();
        setBasicInfo(userData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setToken(null); // fallback เผื่อ error
      }
    }

    fetchData();
  }, [router]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {token ? (
            <h1 className="text-3xl font-bold my-8 text-black">
              {t("Insider")}
            </h1>
          ) : (
            <h1 className="text-3xl font-bold my-8 text-black">
              {t("Outsider")}
            </h1>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="h-full bg-gradient-to-br from-[#ece9f6] to-[#d9d9d9] rounded-2xl shadow-lg p-8"
        >
          <form
            className="flex flex-col gap-8 mx-auto w-full bg-white bg-opacity-80 rounded-2xl shadow-xl p-10 border border-[#ece9f6]"
            onSubmit={handleSubmit}
          >
            {/* Row 1: Prefix, Name-Surname, Age */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("prefix")}
                </label>
                <select
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                  id="prefix"
                  name="prefix"
                >
                  <option value="mr">{t("mr")}</option>
                  <option value="mrs">{t("mrs")}</option>
                  <option value="miss">{t("miss")}</option>
                </select>
              </div>
              <div className="col-span-7">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={
                    basicInfo
                      ? `${basicInfo.firstname_TH} ${basicInfo.lastname_TH}`
                      : undefined
                  }
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                  readOnly={!!token}
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("age")}
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Row 2: Address, Village, District, Subdistrict */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("house_no")}
                </label>
                <input
                  type="text"
                  id="house_no"
                  name="house_no"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("village_no")}
                </label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("street")}
                </label>
                <input
                  type="text"
                  id="road"
                  name="road"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("subdistrict")}
                </label>
                <input
                  type="text"
                  id="sub_district"
                  name="sub_district"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Row 3: Province, District, Phone */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("district")}
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("province")}
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("telephone")}
                </label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Row 4: Current job, ID */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("cerrently")}
                </label>
                <input
                  type="text"
                  id="currently"
                  name="currently"
                  value={basicInfo ? basicInfo.itaccounttype_TH : undefined}
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                  readOnly={!!token}
                />
              </div>
              <div className="col-span-8">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("no")}
                </label>
                <input
                  type="text"
                  id="citizen_id"
                  name="citizen_id"
                  value={basicInfo ? basicInfo.student_id : undefined}
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Reason section */}
            <div>
              <label className="block text-sm font-semibold text-[#6869AA] mb-2">
                {t("reason")}
              </label>
              <textarea
                className="border border-[#d1d5db] w-full rounded-xl px-3 py-3 h-36 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition resize-none"
                id="reason"
                name="reason"
              />
            </div>

            {/* Incident info */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-5">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("accident_area")}
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("date")}
                </label>
                <input
                  type="date"
                  id="accident_date"
                  name="accident_date"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("time")}
                </label>
                <input
                  type="time"
                  id="accident_time"
                  name="accident_time"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Security notifications */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("security_noti_date")}
                </label>
                <input
                  type="date"
                  id="security_noti_date"
                  name="security_noti_date"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-8">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("police_noti_date")}
                </label>
                <input
                  type="date"
                  id="police_noti_date"
                  name="police_noti_date"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-sm font-semibold text-[#6869AA] mb-1">
                  {t("time")}
                </label>
                <input
                  type="time"
                  id="police_noti_time"
                  name="police_noti_time"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Requested camera areas */}
            <div>
              <label className="block text-sm font-semibold text-[#6869AA] mb-2">
                {t("request_area")}
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  id="area_req_1"
                  name="area_req_1"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
                <input
                  type="text"
                  id="area_req_2"
                  name="area_req_2"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
                <input
                  type="text"
                  id="area_req_3"
                  name="area_req_3"
                  className="border border-[#d1d5db] w-full h-11 rounded-xl px-3 bg-[#f7f7fb] focus:ring-2 focus:ring-[#6869AA] transition"
                />
              </div>
            </div>

            {/* Supporting documents section */}
            <div>
              <label className="block text-sm font-semibold text-[#6869AA] mb-2">
                {t("doc")}
              </label>
              <input
                type="file"
                id="supporting_documents"
                name="supporting_documents"
                className="hidden"
                multiple
              />
              <label
                htmlFor="supporting_documents"
                className="hover:cursor-pointer bg-gradient-to-r from-[#6869AA] to-[#a1a2d6] text-white px-8 py-2 rounded-xl shadow hover:from-[#5757a6] hover:to-[#8889c7] transition font-semibold inline-block"
              >
                {t("upload")}
              </label>
            </div>

            {/* Submit button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#6869AA] to-[#a1a2d6] text-white w-full py-3 rounded-xl shadow-lg hover:from-[#5757a6] hover:to-[#8889c7] hover:cursor-pointer transition font-bold text-lg tracking-wide"
              >
                {t("next")}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default FormPage;
