"use client";

import { motion } from "framer-motion";
import { Building, Building2, HousePlus } from "lucide-react";
import React from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useTranslations } from "next-intl";

const BuildingPage: React.FC = () => {
  const t = useTranslations("BuildPage");
  const cardData = [
    {
      title: t("booking"),
      link: process.env.NEXT_PUBLIC_CMU_BOOKING_AREA || "",
      icon: <Building className="w-10 h-10 text-white" strokeWidth={2} />,
    },
    {
      title: t("approve"),
      link: process.env.NEXT_PUBLIC_CMU_BUILDING || "",
      icon: <HousePlus className="w-10 h-10 text-white" strokeWidth={2} />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
      <Header title={t("page_title")} />
      <main className="flex-1 flex flex-col justify-start px-4 py-6 md:py-12">
        <div className="w-full mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* กล่องหัวเรื่อง */}
            <div className="relative rounded-2xl p-6 shadow-lg bg-[url('/service.jpg')] bg-cover bg-center h-32">
              <div className="absolute inset-0 bg-[#111243]/60 rounded-2xl" />
              <div className="relative flex h-full items-center justify-start">
                <div className="flex items-center gap-4">
                  <div className="bg-[#5759BB] rounded-full p-4 shadow-lg">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-white font-extrabold text-2xl md:text-3xl leading-snug">
                    {t("header")}
                  </h1>
                </div>
              </div>
            </div>

            {/* การ์ด 2 ใบ */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
                {cardData.map(({ title, link, icon }, i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="block"
                  >
                    <div className="bg-[#e9eaff] backdrop-blur-md rounded-2xl p-8 flex flex-col items-center transition-all duration-300 shadow-lg border border-white/20 hover:shadow-xl hover:bg-[#a0a4fe]">
                      <div className="w-16 h-16 bg-[#5759BB] rounded-full flex items-center justify-center shadow-md mb-6">
                        {icon}
                      </div>
                      <span className="text-[#5759BB] text-lg font-semibold text-center">
                        {title}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
