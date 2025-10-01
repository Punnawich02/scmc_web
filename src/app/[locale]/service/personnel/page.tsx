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
      icon: <Car className="w-8 h-8 text-white" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: t("doc"),
      link: "#doc",
      icon: <File className="w-8 h-8 text-white" />,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: t("cmuto"),
      link: "https://cmu.to/",
      icon: <Globe className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex-col font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />

      <main className="flex flex-col items-center px-4 py-8 w-full mx-auto max-w-6xl flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* Header Section */}
          <div className="relative rounded-2xl p-6 shadow-lg bg-[url('/service.jpg')] bg-cover bg-center h-32">
            <div className="absolute inset-0 bg-[#111243]/60 rounded-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              {/* Icon Container */}
              <div className="bg-gradient-to-br from-[#5759BB] to-[#4B4DB8] rounded-full p-4 shadow-xl">
                <Building2 className="w-12 h-12 text-white" />
              </div>

              {/* Text Content */}
              <div className="text-center sm:text-left">
                <div className="text-white font-bold text-3xl sm:text-4xl mb-2 drop-shadow-lg">
                  {t("header")}
                </div>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-2 mt-6">
            {cardData.map(({ title, link, icon }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className={
                  index === 2 ? "sm:col-span-2 flex justify-center" : ""
                }
              >
                <Link
                  href={link}
                  className={`block w-full ${
                    index === 2 ? "sm:max-w-md" : ""
                  } group`}
                  target={link.startsWith("http") ? "_blank" : "_self"}
                  rel={link.startsWith("http") ? "noopener noreferrer" : ""}
                >
                  <div className="bg-[#e9eaff] backdrop-blur-md rounded-2xl p-8 flex flex-col items-center transition-all shadow-lg border border-white/20 hover:shadow-xl hover:bg-[#a0a4fe] hover:scale-105">
                      <div className="w-16 h-16 bg-[#5759BB] rounded-full flex items-center justify-center shadow-md mb-6">
                        {icon}
                      </div>
                      <span className="text-[#5759BB] text-lg font-semibold text-center">
                        {title}
                      </span>
                    </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonnelPage;
