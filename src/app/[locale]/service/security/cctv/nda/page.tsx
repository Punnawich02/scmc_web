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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
            บันทึกตกลงไม่เปิดเผยข้อมูล
          </h1>
        </motion.div>

        <div className="h-full bg-gradient-to-br from-[#ece9f6] to-[#d9d9d9] rounded-2xl shadow-lg p-8">
          {/* NDA */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            className="h-full rounded-2xl shadow-lg p-8 bg-white mb-4"
          >
            <div>
              <p className="font-bold mb-2 flex flex-col items-center text-center text-[20px]">
                บันทึกข้อตกลงว่าด้วยการไม่เปิดเผยข้อมูล (NON - DISCLOSURE
                AGREEMENT) <br />
                ระหว่าง
                <br /> ผู้ขอข้อมูลและศูนย์บริหารจัดการเมืองเพื่อความยั่งยืน
              </p>
              <hr className="w-full my-2" />
              <p style={{ textIndent: "2em" }}>
                เนื่องด้วยศูนย์บริหารจัดการเมืองเพื่อความยั่งยืน
                เป็นหน่วยงานหนึ่งของมหาวิทยาลัยเชียงใหม่ ที่ควบคุมดูแล
                ข้อมูลด้านการจราจร การขนส่งมวลชน การรักษาความปลอดภัย
                การเข้าใช้บริการเทคโนโลยีสารสนเทศ และด้านอื่น ๆ ที่
                เกี่ยวข้องกับภารกิจของศูนย์ฯ ทั้งนี้
                ข้อมูลเหล่านี้ประกอบไปด้วยข้อมูลทั่วไป
                และข้อมูลส่วนบุคคลซึ่งมีความสำคัญยิ่ง และ
                เป็นความลับที่ไม่อาจเปิดเผยต่อสาธารณะ บุคคลหรือองค์กรที่ 3 ได้
              </p>
              <p style={{ textIndent: "2em" }}>
                ดังนั้นเพื่อความปลอดภัยของข้อมูลและความมั่นใจของทั้ง 2 ฝ่าย
                ศูนย์ฯ จึงต้องทำความเข้าใจ ยอมรับ และปฏิบัติตามข้อตกลงต่างๆ
                ในการไม่เปิดเผยข้อมูล ซึ่งมีดังต่อไปนี้
              </p>
              <p style={{ textIndent: "2em" }}>
                <span className="font-bold">1. ข้อมูล (Data)</span>{" "}
                ตามจุดประสงค์ของข้อตกลงนี้ “ข้อมูล” หมายถึงข้อมูล
                ที่เกี่ยวกับการจราจร การขนส่งมวลชน การรักษาความปลอดภัย
                การเข้าใช้บริการเทคโนโลยีสารสนเทศ และด้านอื่นๆ
                ที่เกี่ยวข้องกับภารกิจของศูนย์ฯ ที่อาจเป็นการบ่งชี้ถึงตัวบุคคล
                โดยที่ข้อมูลดังกล่าวไม่ว่าจะเป็นการได้มาโดยการเห็น
                หรือการรับข้อมูล ทั้งในรูปแบบของรูปภาพ วิดีโอ ข้อมูลภาพรวม
                (Summary data) หรือข้อมูลดิบ (Raw data)
              </p>
              <p style={{ textIndent: "2em" }}>
                <span className="font-bold">
                  2. ข้อจำกัดในการใช้ข้อมูล (LIMITATIONS ON USE)
                </span>{" "}
                ท่านสามารถใช้ “ข้อมูล” เพื่อการประมวลผลตามวัตถุประสงค์ที่
                ท่านแจ้งมาเท่านั้น ห้ามใช้เพื่อหาประโยชน์ส่วนตัว
                หรือเพื่อหาประโยชน์ในการร่วมมือกับองค์กรอื่นใด อันอาจจะเป็นการ
                ส่งผลเสียแก่ศูนย์ฯ
              </p>
              <p style={{ textIndent: "2em" }}>
                <span className="font-bold">
                  3. ความใส่ใจในข้อมูลที่มอบให้ (CARE OF PROPRIETARY)
                </span>{" "}
                ท่านจะต้องตระหนักและระมัดระวังที่จะไม่เปิดเผยข้อมูลต่อสาธารณะ
                บุคคลหรือองค์กรที่อื่นใดได้รับรู้ เช่น ไม่สามารถโพสต์บนสื่อสังคม
                Social Media ต่างๆ (Facebook, Instagram, Twitter (X), Line,
                เว็บบอร์ดต่างๆ เป็นต้น) ยกเว้นเจ้าหน้าที่ตามกฎหมาย
                หรือมีระเบียบอื่นใดที่ได้รับการยอมรับจากศูนย์ฯ
                ให้เผยแพร่ข้อมูลได้
                โดยที่ท่านต้องยอมรับข้อตกลงและต้องปฏิบัติจริงในการรับผิดชอบต่อการที่จะ
                หลีกเลี่ยงการเปิดเผยข้อมูล หรือการเป็นผู้นำข้อมูล
                ไปใช้ให้เป็นผลเสียแก่ศูนย์ฯ
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            className="h-full rounded-2xl shadow-lg p-8 bg-white"
          >
            <form className="flex flex-col gap-4 mx-auto w-full">
              <div className="grid grid-cols-6 gap-6 items-center">
                <div className="col-span-3">
                  <label className="block text-base font-semibold text-[#6869AA] mb-1">
                    ข้าพเจ้า
                  </label>
                  <input
                    type="text"
                    id="house_number"
                    name="house_number"
                    className="bg-[#F7F7FB] border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] transition"
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
                    className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-[#F7F7FB] transition"
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
                    className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-[#F7F7FB] transition"
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
                    className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-[#F7F7FB] transition"
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
                    className="border border-[#c3c3e6] w-full h-12 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-[#F7F7FB] transition"
                    placeholder="กรอกเบอร์โทรติดต่อ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-[#6869AA] mb-2">
                  วัตถุประสงค์ในการขอข้อมูล
                </label>
                <textarea
                  className="border border-[#c3c3e6] w-full rounded-xl px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-[#6869AA] bg-[#F7F7FB] transition"
                  id="reason"
                  name="reason"
                  placeholder="โปรดระบุวัตถุประสงค์"
                />
              </div>

              <div className="flex items-center gap-3">
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

              <div>
                <button
                  type="submit"
                  className="hover:cursor-pointer bg-gradient-to-r from-[#6869AA] to-[#8e8ee6] text-white w-full py-3 rounded-xl shadow-md hover:from-[#5757a6] hover:to-[#7a7ad1] transition font-semibold text-lg"
                >
                  ส่งข้อมูล
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PDPAPage;
