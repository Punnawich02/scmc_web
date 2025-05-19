"use client";
import Header from "../../../../Component/Header";
import Footer from "../../../../Component/Footer";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";

// import { useTranslations } from "next-intl";

const InsidePage = () => {
  // const t = useTranslations("FixPage");
    const [ token , setToken] = useState(null);
    const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
    const searchParam = useSearchParams();
    const type = searchParam.get("type");
    const [header, setHeader] = useState("");

  useEffect(() => {
    if (type === "internal") {
      setHeader("สำหรับบุคลากร / นักศึกษาในมช");
    } else if (type === "external") {
      setHeader("สำหรับบุคคลภายนอก");
    }
  }, [type]);


    
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
  }, [type]);


  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title="Delelopment" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        {token ? (
          <h1 className="text-3xl font-bold my-8 text-black">
            {/* นักศึกษา/บุคลากรภายในมช. */}
            {header}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold my-8 text-black">
            {/* บุคคลภายนอก */}
            {header}
          </h1>
        )}
        <form className="flex flex-col gap-6 mx-auto w-full">
          {/* Row 1: Prefix, Name-Surname, Age */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2">
              <label className="block text-sm font-medium">คำนำหน้า</label>
              <select
                className="border w-full h-10 rounded-xl px-3 mt-1"
                id="prefix"
                name="prefix"
              >
                <option value="mr">นาย</option>
                <option value="mrs">นาง</option>
                <option value="miss">นางสาว</option>
              </select>
            </div>
            <div className="col-span-7">
              <label className="block text-sm font-medium">ชื่อ-สกุล</label>
              <input
                type="text"
                id="name"
                name="name"
                value={
                type === "external"
                ? ""
                : basicInfo
                ? `${basicInfo.firstname_TH} ${basicInfo.lastname_TH}`
                : ""
              }
                className="border w-full h-10 rounded-xl px-3 mt-1"
                readOnly
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium">อายุ</label>
              <input
                type="number"
                id="age"
                name="age"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Row 2: Address, Village, District, Subdistrict */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3">
              <label className="block text-sm font-medium">บ้านเลขที่</label>
              <input
                type="text"
                id="house_number"
                name="house_number"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium">หมู่</label>
              <input
                type="text"
                id="village_number"
                name="village_number"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium">ถนน</label>
              <input
                type="text"
                id="road"
                name="road"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium">ตำบล</label>
              <input
                type="text"
                id="sub_district"
                name="sub_district"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Row 3: Province, District, Phone */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <label className="block text-sm font-medium">อำเภอ</label>
              <input
                type="text"
                id="district"
                name="district"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium">จังหวัด</label>
              <input
                type="text"
                id="province"
                name="province"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium">
                หมายเลขโทรศัพท์
              </label>
              <input
                type="text"
                id="tel"
                name="tel"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Row 4: Current job, ID */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <label className="block text-sm font-medium">ปัจจุบันเป็น</label>
              <input
                type="text"
                id="status"
                name="status"
                value=
                {type === "external"
                ? ""
                : basicInfo
                ? `${basicInfo.itaccounttype_TH}`
                : ""}
                className="border w-full h-10 rounded-xl px-3 mt-1"
                readOnly
              />
            </div>
            <div className="col-span-8">
              <label className="block text-sm font-medium">
                เลขที่บัตรประจำตัวประชาชน/รหัสนักศึกษา
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value=
                {type === "external"
                ? ""
                : basicInfo
                ? `${basicInfo.student_id}`
                : ""}
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Reason section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              ขอดูภาพกล้องวงจรปิดเนื่องจาก
            </label>
            <textarea
              className="border w-full rounded-xl px-3 py-2 h-36"
              id="reason"
              name="reason"
            />
          </div>

          {/* Incident info */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5">
              <label className="block text-sm font-medium">
                เกิดเหตุบริเวณ
              </label>
              <input
                type="text"
                id="area"
                name="area"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium">วันที่</label>
              <input
                type="date"
                id="accident_date"
                name="accident_date"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium">เวลา</label>
              <input
                type="time"
                id="accident_time"
                name="accident_time"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Security notifications */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12">
              <label className="block text-sm font-medium">
                แจ้งหน่วยรักษาความปลอดภัยเมื่อวันที่
              </label>
              <input
                type="date"
                id="security_noti_date"
                name="security_noti_date"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8">
              <label className="block text-sm font-medium">
                แจ้งสถานีตำรวจท้องที่เมื่อวันที่
              </label>
              <input
                type="date"
                id="police_noti_date"
                name="police_noti_date"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-sm font-medium">เวลา</label>
              <input
                type="time"
                id="police_noti_time"
                name="police_noti_time"
                className="border w-full h-10 rounded-xl px-3 mt-1"
              />
            </div>
          </div>

          {/* Requested camera areas */}
          <div>
            <label className="block text-sm font-medium mb-2">
              บริเวณที่ขอภาพกล้องวงจรปิด
            </label>
            <input
              type="text"
              id="area_req_1"
              name="area_req_1"
              className="border w-full h-10 rounded-xl px-3 mt-1 mb-2"
            />
            <input
              type="text"
              id="area_req_2"
              name="area_req_2"
              className="border w-full h-10 rounded-xl px-3 mb-2"
            />
            <input
              type="text"
              id="area_req_3"
              name="area_req_3"
              className="border w-full h-10 rounded-xl px-3"
            />
          </div>

          {/* Supporting documents section */}
          <div>
            <label className="block text-sm font-medium mb-2">
              เอกสารหลักฐานประกอบ
            </label>
            <button className="bg-[#6869AA] text-white px-6 py-2 rounded-xl hover:bg-opacity-90">
              อัปโหลด
            </button>
          </div>

          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#6869AA] text-white w-full py-3 rounded-xl hover:bg-opacity-90 font-medium"
            >
              ถัดไป
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default InsidePage;
