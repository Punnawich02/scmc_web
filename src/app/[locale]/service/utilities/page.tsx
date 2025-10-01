"use client";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import { Building2, ChartLine, House, MapPin, Phone, Trash2, UserRound } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const UtilityPage: React.FC = () => {
  const t = useTranslations("UtilitiesPage");
  const cardData = [
    {
      title: t("co_user"),
      link: "https://buildings.oop.cmu.ac.th/electric/",
      icon: <UserRound className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("department"),
      link: "https://buildings.oop.cmu.ac.th/department/",
      icon: <MapPin className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("residences"),
      link: "https://buildings.oop.cmu.ac.th/house/",
      icon: <House className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("usage"),
      link: "https://buildings.oop.cmu.ac.th/report/meter/",
      icon: <ChartLine className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("phone"),
      link: "https://buildings.oop.cmu.ac.th/telephone/",
      icon: <Phone className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
    {
      title: t("waste"),
      link: "https://buildings.oop.cmu.ac.th/garbage/",
      icon: <Trash2 className="w-10 h-10" color="#FFF" strokeWidth={2} />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
      <Header title={t("page_title")} />
      <main className="flex-1 flex flex-col justify-center px-4 py-8 md:py-12">
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

            {/* การ์ด */}
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
                    <div className="bg-[#e9eaff] backdrop-blur-md rounded-2xl p-8 flex flex-col items-center transition-all shadow-lg border border-white/20 hover:shadow-xl hover:bg-[#a0a4fe] hover:scale-105">
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

export default UtilityPage;
