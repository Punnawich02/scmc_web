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
      link: `/${locale}/service/utilities/electricity_and_water`,
      icon: (
        <div className="flex">
          <Droplet className="w-6 h-6 mx-[-5]" color="#FFF" strokeWidth={2} />
          <Zap className="w-6 h-6 mx-[-5]" color="#FFF" strokeWidth={2} />
        </div>
      ),
      isExt: false,
    },
    {
      title: t("phone"),
      link: "https://buildings.oop.cmu.ac.th/telephone/",
      icon: (
        <Phone
          className="w-6 h-6 sm:w-12 md:w-8 h-8"
          color="#FFF"
          strokeWidth={2}
        />
      ),
      isExt: true,
    },
    {
      title: t("trash"),
      link: "https://buildings.oop.cmu.ac.th/garbage/",
      icon: (
        <Trash2
          className="w-6 h-6 sm:w-12 md:w-8 h-8"
          color="#FFF"
          strokeWidth={2}
        />
      ),
      isExt: true,
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
                <Building2 className="w-12 h-12 text-white" />
              </div>
              {/* ข้อความ */}
              <h1 className="text-white font-bold text-2xl mb-1 text-center sm:text-start sm:text-3xl">
                {t("header")}
              </h1>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("title")}
              </p>
            </div>

            {/* การ์ด 4 บน */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  px-0 sm:px-9 py-4 sm:p-6">
              {cardData.map(({ title, link, icon, isExt }, i) => (
                <div key={i}>
                  {isExt ? (
                    <a href={link} className="sm:w-[50%] w-full" target="_blank">
                      <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                        <div className="w-14 h-14 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 shadow-md">
                          {icon}
                        </div>
                        <span className="text-[#5759BB] text-xl font-semibold  ml-6 sm:ml-0 text-start sm:text-center">
                          {title}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <Link href={link} className="sm:w-[50%] w-full">
                      <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                        <div className="w-14 h-14 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 shadow-md">
                          {icon}
                        </div>
                        <span className="text-[#5759BB] text-xl font-semibold  ml-6 sm:ml-0 text-start sm:text-center">
                          {title}
                        </span>
                      </div>
                    </Link>
                  )}
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

export default UtilityPage;
