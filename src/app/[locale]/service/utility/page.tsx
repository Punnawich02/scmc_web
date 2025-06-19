"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import { Droplet, Zap, Phone, Trash2, Building2 } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const UtilityPage: React.FC = () => {
  const t = useTranslations("UtilitiesPage");
  const cardData = [
    {
      title: t("water"),
      description: t("water_title"),
      link: "#water",
      icon: <Droplet className="w-8 h-8" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("electric"),
      description: t("electric_title"),
      link: "#electric",
      icon: <Zap className="w-8 h-8" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("phone"),
      description: t("phone_title"),
      link: "#phone",
      icon: <Phone className="w-8 h-8" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("trash"),
      description: t("trash_title"),
      link: "#trash",
      icon: <Trash2 className="w-8 h-8" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-6 w-full mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[80%]"
        >
          {/* กล่องหลัก */}
          <div className="rounded-3xl bg-[#8F90E5]  p-8 shadow-xl">
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

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  ">
              {cardData.map(({ title, link, icon }, i) => (
                <Link href={link} key={i}>
                  <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-105 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                    <div className="w-14 h-14 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 shadow-md">
                      {icon}
                    </div>
                    <span className="text-white text-xl font-semibold  ml-6 sm:ml-0 text-start sm:text-center">
                      {title}
                    </span>
                  </div>
                </Link>
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
