"use client";

import Header from "../../../../Component/Header";
import Footer from "../../../../Component/Footer";
import { motion } from "framer-motion";
import React from "react";
// import { useTranslations } from "next-intl";
// import Link from "next/link";

const PDPAPage: React.FC = () => {
  //   const t = useTranslations("SecurityPage");
  //   const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="ทดสอบ" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
            บันทึกตกลงไม่เปิดเผยข้อมูล
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="h-full bg-gradient-to-br from-[#ece9f6] to-[#d9d9d9] rounded-2xl shadow-lg p-8"
        >
          <form className="flex flex-col gap-8 mx-auto w-full">
            <div className="grid grid-cols-6 gap-6 items-center">
              <div className="col-span-3">
                <label className="block text-base font-semibold text-[#6869AA] mb-1">
                  ข้าพเจ้า
                </label>
                <input
                  type="text"
                  id="house_number"
                  name="house_number"
                  className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-base font-semibold text-[#6869AA] mb-1">
                  รหัสนักศึกษา
                </label>
                <input
                  type="text"
                  id="village_number"
                  name="village_number"
                  className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                  placeholder="กรอกรหัสนักศึกษา"
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-6 items-center">
              <div className="col-span-4">
                <label className="block text-base font-semibold text-[#6869AA] mb-1">
                  คณะ/สังกัด
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                  placeholder="กรอกคณะ/สังกัด"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-base font-semibold text-[#6869AA] mb-1">
                  เลขบัตรประชาชน
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                  placeholder="กรอกเลขบัตรประชาชน"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 items-center">
              <div className="col-span-4">
                <label className="block text-base font-semibold text-[#6869AA] mb-1">
                  เบอร์โทรติดต่อ
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                  placeholder="กรอกเบอร์โทรติดต่อ"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-[#6869AA] mb-2">
                วัตถุประสงค์ในการขอข้อมูล
              </label>
              <textarea
                className="border border-[#c3c3e6] w-full rounded-xl px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-white transition"
                id="reason"
                name="reason"
                placeholder="โปรดระบุวัตถุประสงค์"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                id="area"
                name="area"
                className="h-5 w-5 accent-[#6869AA] rounded border-gray-300 focus:ring-2 focus:ring-[#6869AA] transition"
              />
              <label
                htmlFor="area"
                className="text-base font-medium select-none cursor-pointer text-[#6869AA]"
              >
                ยอมรับข้อตกลง
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#6869AA] to-[#8e8ee6] text-white w-full py-3 rounded-xl shadow-md hover:from-[#5757a6] hover:to-[#7a7ad1] transition font-semibold text-lg"
              >
                ส่งข้อมูล
              </button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PDPAPage;
