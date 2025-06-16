"use client";

import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { BusFront, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TransportPage() {
  const t = useTranslations("TransportPage");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />

      <main className="flex flex-col items-center px-4 py-12 max-w-7xl mx-auto w-full">
        {/* ส่วนหัวไอคอน + ข้อความ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#9799E7] rounded-2xl px-6 py-8 sm:px-12 sm:py-10 flex items-center gap-8"
        >
          <div className="w-28 h-28 rounded-full bg-[#5759BB] flex items-center justify-center flex-shrink-0">
            <BusFront className="w-14 h-14 text-white" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-0 whitespace-nowrap">
              {t("header")}
            </h1>
            <p className="text-base sm:text-lg sm:ml-6 sm:flex-1 text-white">
              {t("table")}
            </p>
          </div>
        </motion.div>

        {/* Dropdown */}
        <div className="mt-10 w-full max-w-5xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-[#EFEFFF] border border-[#8586D1] rounded-full px-6 py-3 transition-all"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center w-full text-black">
              {t("table")}
            </h2>
            <ChevronDown
              className={`text-[#8586D1] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* เนื้อหาเมื่อเปิด */}
          {isOpen && (
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
