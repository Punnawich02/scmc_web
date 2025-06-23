"use client";
import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Map, TreeDeciduous } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PhysicalPage() {
  const t = useTranslations("PhysicalPage");
  const locale = useLocale();

  const cardData = [
    {
      title: t("map"),
      link: `/${locale}/physical/map`,
      icon: <Map />,
    },
    {
      title: t("tree"),
      link: process.env.NEXT_PUBLIC_CMU_PLANT,
      icon: <TreeDeciduous />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-6 sm:py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-6 sm:mb-9"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#6869AA] w-full text-left">
            {t("header")}
          </h1>
        </motion.div>

        {/* ภาพพื้นหลัง - ปรับให้ responsive */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex flex-col items-center justify-center">
          <Image
            src="/physical.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-[#1F4788]/60" />

          {/* การ์ด 2 ใบแรก - ปรับ layout และขนาด */}
          <div className="relative justify-items-center mx-4 sm:mx-10 md:mx-0 z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-fit px-4 sm:px-8">
            {cardData.slice(0, 2).map((card, index) => (
              <Link href={`${card.link}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-[280px] sm:w-[260px] md:w-[340px] h-[80px] sm:h-[100px] md:h-[140px] bg-white/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg hover:scale-105 transition-transform px-4 sm:px-6">
                    <div className="bg-[#5759BB] rounded-full p-2 sm:p-3 md:p-4 flex items-center justify-center flex-shrink-0">
                      {React.cloneElement(card.icon, {
                        className:
                          "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white",
                      })}
                    </div>
                    <div className="text-white text-sm sm:text-base md:text-lg font-bold">
                      {card.title}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* การ์ดใบสุดท้าย (อยู่กลาง) - ปรับขนาด */}
          {cardData.length > 2 && (
            <div className="relative mx-4 sm:mx-10 md:mx-0 z-10 mt-4 sm:mt-6 flex justify-center w-full pb-6 sm:pb-0">
              <Link href={`${cardData[2].link}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 sm:gap-6 w-[280px] sm:w-[340px] h-[80px] sm:h-[100px] md:h-[140px] bg-white/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg hover:scale-105 transition-transform px-4 sm:px-6"
                >
                  <div className="bg-[#5759BB] rounded-full p-2 sm:p-3 md:p-4 flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(cardData[2].icon, {
                      className:
                        "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white",
                    })}
                  </div>
                  <div className="text-white text-sm sm:text-base md:text-lg font-bold">
                    {cardData[2].title}
                  </div>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
