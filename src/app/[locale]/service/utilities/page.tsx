"use client";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import { Droplet, Zap, Phone, Trash2, Building2 } from "lucide-react";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const UtilityPage: React.FC = () => {
  const t = useTranslations("UtilitiesPage");
  const locale = useLocale();
  const cardData = [
    {
      title: t("electricandwater"),
      link: `/${locale}/service/utility/electricity_and_water`,
      icon: <Droplet className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("electricandwater"),
      link: `/${locale}/service/utility/electricity`,
      icon: <Zap className="w-6 h-6 sm:w-8 h-8" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("phone"),
      link: "https://buildings.oop.cmu.ac.th/telephone/",
      icon: <Phone className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("trash"),
      link: "https://buildings.oop.cmu.ac.th/garbage/",
      icon: <Trash2 className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center py-4 sm:py-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full px-2 sm:px-4 md:px-6 lg:px-8"
        >
          {/* กล่องหลัก */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#8F90E5] p-6 sm:p-10 md:p-15 shadow-xl w-full max-w-7xl mx-auto">
            {/* หัวเรื่อง */}
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-15 mb-6 sm:mb-8">
              {/* Icon */}
              <div className="bg-[#5759BB] rounded-full p-3 shadow-lg backdrop-blur-sm">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              {/* ข้อความ */}
              <div className="flex flex-col xl:flex-row gap-10 text-center lg:text-left">
                <h1 className="text-white font-bold mb-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {t("header")}
                </h1>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  {t("title")}
                </p>
              </div>
            </div>
            
            {/* Grid Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-0 sm:px-10 lg:px-20 mt-12 sm:mt-16 md:mt-20">
              {/* Card 1 - ประปาและไฟฟ้า */}
              <Link href={cardData[0].link}>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-4 md:p-6 flex flex-row items-center justify-start xl:justify-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20 relative">
                  <div className="p-4 sm:p-6 md:p-8 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 shadow-md relative">
                    {cardData[0].icon}
                    <div className="absolute bg-[#5759BB] rounded-full flex items-center justify-center shadow-md mt-5 sm:mt-10 ml-5 sm:ml-10">
                      {cardData[1].icon}
                    </div>
                  </div>
                  <span className="text-[#5759BB] text-lg sm:text-2xl md:text-3xl font-semibold ml-4 sm:ml-6 md:ml-8 text-start flex-1">
                    {cardData[0].title}
                  </span>
                </div>
              </Link>

              {/* Card 2 - โทรศัพท์ */}
              <Link href={cardData[2].link}>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-4 md:p-6 flex flex-row items-center justify-start xl:justify-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                  <div className="p-4 sm:p-6 md:p-8 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    {cardData[2].icon}
                  </div>
                  <span className="text-[#5759BB] text-lg sm:text-2xl md:text-3xl font-semibold ml-4 sm:ml-6 md:ml-8 text-center">
                    {cardData[2].title}
                  </span>
                </div>
              </Link>

              {/* Card 3 - ขยะ (เต็มความกว้าง แต่อยู่กึ่งกลางในจอใหญ่) */}
              <div className="col-span-1 lg:col-span-2 flex justify-center">
                <div className="w-full lg:w-1/2">
                  <Link href={cardData[3].link}>
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:px-6 sm:py-4 md:p-6 flex flex-row items-center justify-start xl:justify-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20 w-full">
                      <div className="p-4 sm:p-6 md:p-8 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        {cardData[3].icon}
                      </div>
                      <span className="text-[#5759BB] text-lg sm:text-2xl md:text-3xl font-semibold ml-4 sm:ml-6 md:ml-8 text-start flex-1">
                        {cardData[3].title}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default UtilityPage;