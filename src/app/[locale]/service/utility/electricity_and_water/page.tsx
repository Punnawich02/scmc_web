"use client";
import Header from "../../../Component/Header";
import Footer from "../../../Component/Footer";
import { motion } from "framer-motion";
import { Users, MapPin, Home, BarChart3, Droplet, Zap } from "lucide-react";
import React from "react";
import { useTranslations} from "next-intl";
import Link from "next/link";

const UtilityPage: React.FC = () => {
  const t = useTranslations("electricandwater");
  const cardData = [
    {
      title: t("collaborator"),
      link: `https://buildings.oop.cmu.ac.th/electric/`,
      icon: <Users className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("department"),
      link: `https://buildings.oop.cmu.ac.th/department/`,
      icon: <MapPin className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("house"),
      link: "https://buildings.oop.cmu.ac.th/house/",
      icon: <Home className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("usage_report"),
      link: "https://buildings.oop.cmu.ac.th/report/meter/",
      icon: <BarChart3 className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />,
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
              <div className="p-4 sm:p-6 md:p-8 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 shadow-md relative">
                <Droplet className="w-8 h-8 sm:w-12 md:w-15 h-15" color="#FFF" strokeWidth={1.5} />
                <div className="absolute bg-[#5759BB] rounded-full flex items-center justify-center shadow-md mt-5 sm:mt-10 ml-5 sm:ml-10">
                  <Zap className="w-6 h-6 sm:w-8 h-8" color="#FFF" strokeWidth={1.5} />
                </div>
              </div>
              {/* ข้อความ */}
              <div className="flex flex-col xl:flex-row gap-10 text-center lg:text-left">
                <h1 className="text-white font-bold mb-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {t("header")}
                </h1>
              </div>
            </div>
            
            {/* Grid Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-0 sm:px-10 lg:px-20 mt-12 sm:mt-16 md:mt-20">
              {cardData.map((card, index) => (
                <Link href={card.link} key={index}>
                  <div className="bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:px-6 sm:py-4 md:p-6 flex flex-row items-center justify-start hover:scale-103 hover:bg-white/40 transition-all duration-300 shadow-lg border border-white/20">
                    <div className="p-4 sm:p-6 md:p-8 bg-[#5759BB] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      {card.icon}
                    </div>
                    <span className="text-[#5759BB] text-lg sm:text-2xl md:text-3xl font-semibold ml-4 sm:ml-6 md:ml-8 text-start flex-1">
                      {card.title}
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