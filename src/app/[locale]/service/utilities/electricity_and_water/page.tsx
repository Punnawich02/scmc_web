"use client";
import Header from "../../../Component/Header";
import Footer from "../../../Component/Footer";
import { motion } from "framer-motion";
import { Users, MapPin, Home, BarChart3, Droplet, Zap } from "lucide-react";
import React from "react";
import { useTranslations} from "next-intl";

const UtilityPage: React.FC = () => {
  const t = useTranslations("electricandwater");
  const cardData = [
    {
      title: t("collaborator"),
      link: process.env.NEXT_PUBLIC_CMU_ELECTRIC,
      icon: <Users className="w-8 h-8" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("department"),
      link: process.env.NEXT_PUBLIC_CMU_DEPARTMENT,
      icon: <MapPin className="w-8 h-8" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("house"),
      link: process.env.NEXT_PUBLIC_CMU_HOUSE,
      icon: <Home className="w-8 h-8" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("usage_report"),
      link: process.env.NEXT_PUBLIC_CMU_METER,
      icon: <BarChart3 className="w-8 h-8" color="#FFF" strokeWidth={2} />,
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
              <div className="bg-[#5759BB] rounded-full p-3 shadow-lg backdrop-blur-sm flex">
                <Droplet className="w-12 h-12 text-white" />
                <Zap className="w-12 h-12 text-white" />
              </div>
              {/* ข้อความ */}
              <h1 className="text-white font-bold text-2xl mb-1 text-center sm:text-start sm:text-3xl">
                {t("header")}
              </h1>
              
            </div>

            {/* การ์ด 4 บน */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  px-0 sm:px-9 py-4 sm:p-6">
              {cardData.map(({ title, link, icon }, i) => (
                <div key={i}>
                  <a href={link || ""} className="sm:w-[50%] w-full" target="_blank">
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-4 sm:p-6 flex flex-row sm:flex-col items-center hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                      <div className="w-14 h-14 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 sm:mb-4 shadow-md">
                        {icon}
                      </div>
                      <span className="text-[#5759BB] text-xl font-semibold  ml-6 sm:ml-0 text-start sm:text-center">
                        {title}
                      </span>
                    </div>
                  </a>
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