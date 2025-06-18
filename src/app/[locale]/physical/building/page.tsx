"use client";

import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BuildingPage() {
  const p = useTranslations("PhysicalPage");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={p("page_title")} />

      <main className="flex flex-col items-center px-4 py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#9799E7] rounded-2xl px-6 py-8 sm:px-12 sm:py-10 
                     flex flex-col sm:flex-row items-center gap-6 sm:gap-8"

        >
          {/* Icon */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#5759BB] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>

          {/* Text */}
            <div className="flex flex-col sm:flex-row items-center w-full text-white">
              <h1 className="text-3xl sm:text-6xl font-bold mb-2">
                {p("build")}
              </h1>
              <p className="text-base sm:text-lg sm:ml-6 sm:flex-1 justify-start">
                {p("build_title")}
              </p>
            </div>
        </motion.div>

        {/* Dropdown */}
        <div className="mt-10 w-full">
          <button
            onClick={() => setIsOpen1(!isOpen1)}
            className="w-full flex items-center justify-between bg-[#EFEFFF] border border-[#8586D1] rounded-full px-6 py-3 transition-all"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center w-full text-black">
              <p>คณะวิศวกรรมศาสตร์</p>
            </h2>

          </button>

          {/* เนื้อหาเมื่อเปิด */}
          {isOpen1 && (
            <div className="mt-6">
              <p className="text-gray-700 text-center">
                🚍 ตารางเดินรถ ขส.มช. จะมาแสดงที่นี่ เช่น รูปภาพ หรือ component ตาราง
              </p>
            </div>
          )}
        </div>

        {/* Dropdown */}
        <div className="mt-10 w-full">
          <button
            onClick={() => setIsOpen2(!isOpen2)}
            className="w-full flex items-center justify-between bg-[#EFEFFF] border border-[#8586D1] rounded-full px-6 py-3 transition-all"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center w-full text-black">
              <p>อาคาร 30 ปี คณะวิศวกรรมศาสตร์</p>
            </h2>

          </button>

          {/* เนื้อหาเมื่อเปิด */}
          {isOpen2 && (
            <div className="mt-6">
              <p className="text-gray-700 text-center">
                🚍 ตารางเดินรถ ขส.มช. จะมาแสดงที่นี่ เช่น รูปภาพ หรือ component ตาราง
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
