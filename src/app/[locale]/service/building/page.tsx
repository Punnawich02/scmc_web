"use client";

import { motion } from "framer-motion";
import { Building, Building2, HousePlus } from "lucide-react";
import React from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BuildingPage: React.FC = () => {
  const t = useTranslations("BuildPage");
  const cardData = [
    {
      title: t("booking"),
      link: process.env.NEXT_PUBLIC_CMU_BOOKING_AREA || "",
      description: t("build_title"),
      icon: <Building className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("approve"),
      link: process.env.NEXT_PUBLIC_CMU_BUILDING || "",
      description: t("check_title"),
      icon: <HousePlus className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-white flex-col font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-6 w-full mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-0 sm:px-15"
        >
          {/* กล่องหลัก */}
          <div className="rounded-3xl bg-[#8F90E5] p-8 shadow-xl">
            {/* หัวเรื่อง */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              {/* Icon */}
              <div className="bg-[#5759BB] rounded-full p-3 shadow-lg backdrop-blur-sm">
                <Building2 className="w-10 h-10 text-white" />
              </div>

              {/* ข้อความ */}

              <h1 className="text-white font-bold text-2xl mb-1 text-center sm:text-start sm:text-3xl">
                {t("header")}
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("title")}
              </p>
            </div>

            {/* การ์ด 2 บน 1 ล่าง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  px-0 sm:px-9 py-4 sm:p-6">
              {cardData.map(({ title, link, icon }, i) => (
                <div
                  key={i}
                  className={i === 2 ? "sm:col-span-2 flex justify-center" : ""}
                >
                  <Link href={link} className="sm:w-[50%] w-full">
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                      <div className="w-14 h-14 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 shadow-md">
                        {icon}
                      </div>
                      <span className="text-white text-xl font-semibold  ml-6 sm:ml-0 text-start sm:text-center">
                        {title}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
