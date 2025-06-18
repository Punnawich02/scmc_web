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
          className="w-[80%]"
        >
          {/* กล่องหลัก */}
          <div className="rounded-2xl bg-[#8F90E5] p-6 shadow-lg">
            {/* หัวเรื่อง */}
            <div className="relative mb-10 flex flex-col sm:flex-row items-center sm:items-start">
              {/* Icon */}
              <div className="bg-[#5759BB] rounded-full p-4 shadow-lg sm:absolute sm:top-0 sm:left-0 mb-4 sm:mb-0">
                <Building2 className="w-10 h-10 text-white" />
              </div>

              {/* ข้อความ */}
              <div className="sm:ml-24 text-center sm:text-left">
                <h1 className="text-white font-extrabold text-3xl leading-snug mb-2">
                  {t("header")}
                </h1>
                <p className="text-white/90 text-base max-w-xl">{t("title")}</p>
              </div>
            </div>

            {/* การ์ด 2 บน 1 ล่าง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cardData.map(({ title, link, icon }, i) => (
                <div
                  key={i}
                  className={i === 2 ? "sm:col-span-2 flex justify-center" : ""}
                >
                  <Link href={link} className="sm:w-[50%] w-full">
                    <div className="bg-white/40 rounded-xl p-6 flex items-center gap-6 hover:scale-105 transition-transform">
                      <div className="w-16 h-16 bg-[#5759BB] rounded-full flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="text-white font-semibold text-lg">
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
