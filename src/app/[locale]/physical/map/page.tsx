"use client";


import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Map } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function MapPage() {
  const p = useTranslations("PhysicalPage");
  

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={p("page_title")} />

      <main className="flex flex-col items-center px-4 py-12 max-w-7xl mx-auto w-full">
        {/* ส่วนหัวไอคอน + ข้อความ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#9799E7] rounded-2xl px-6 py-8 sm:px-12 sm:py-10 
                     flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
        >
          <div className="w-28 h-28 rounded-full bg-[#5759BB] flex items-center justify-center flex-shrink-0">
            <Map className="w-14 h-14 text-white" />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-0 whitespace-nowrap">
              {p("map")}
            </h1>
            <p className="text-base sm:text-lg sm:ml-6 sm:flex-1 text-white">
              {p("map_title")}
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
