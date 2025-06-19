"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import { Building2, Car, File, Globe } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PersonnelPage: React.FC = () => {
  const t = useTranslations("PersonelPage");

  const cardData = [
    {
      title: t("car"),
      link: "#car",
      icon: <Car className="w-10 h-10 text-white" />,
    },
    {
      title: t("doc"),
      link: "#doc",
      icon: <File className="w-10 h-10 text-white" />,
    },
    {
      title: t("cmuto"),
      link: "https://cmu.to/",
      icon: <Globe className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-6 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[80%]"
        >
          {/* กล่องหลัก */}
          <div className="rounded-3xl bg-[#8F90E5] p-6 shadow-lg">
            {/* หัวเรื่อง */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              {/* Icon */}
              <div className="bg-white/20 rounded-full p-3 shadow-lg backdrop-blur-sm">
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

            {/* การ์ด 2 บน 1 ล่าง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  px-0 sm:px-9 py-4 sm:p-6">
              {cardData.map(({ title, link, icon }, i) => (
                <div
                  key={i}
                  className={i === 2 ? "sm:col-span-2 flex justify-center" : ""}
                >
                  <Link href={link} className="sm:w-[50%] w-full">
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-105 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
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

export default PersonnelPage;
