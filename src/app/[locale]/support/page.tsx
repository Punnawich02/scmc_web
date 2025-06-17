"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Wrench, MessageSquare, Shrub } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function SupportPage() {
  const t = useTranslations("SupportPage");

  const cardData = [
    {
      title: t("fix"),
      description: t("fix_title"),
      link: "/support/fix",
      icon: <Wrench />,
    },
    {
      title: t("comment"),
      description: t("comment_title"),
      link: "#comment",
      icon: <MessageSquare />,
    },
    {
      title: t("sdg"),
      description: t("sdg_title"),
      link: "#sdg",
      icon: <Shrub />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-9"
        >
          <h1 className="text-5xl font-extrabold text-[#6869AA] w-full text-left">
            {t("header")}
          </h1>
        </motion.div>
        {/* /support/bg-support.jpg */}

        {/* ภาพพื้นหลัง */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
          <Image
            src="/support/bg-support.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-[#1F4788]/60" />

          {/* การ์ด 2 ใบแรก */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-fit px-8">
            {cardData.slice(0, 2).map((card, index) => (
              <Link href={""} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 w-[340px] h-[140px] bg-white/40 backdrop-blur-md rounded-3xl shadow-lg hover:scale-105 transition-transform px-6">
                    <div className="bg-[#5759BB] rounded-full p-4 flex items-center justify-center flex-shrink-0">
                      {React.cloneElement(card.icon, {
                        className: "w-10 h-10 text-white",
                      })}
                    </div>
                    <div className="text-white text-lg font-bold">
                      {card.title}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* การ์ดใบสุดท้าย (อยู่กลาง) */}
          {cardData.length > 2 && (
            <div className="relative z-10 mt-6 flex justify-center w-full">
              <Link href={``}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3 * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6  w-[340px] h-[140px] bg-white/40 backdrop-blur-md rounded-3xl shadow-lg hover:scale-105 transition-transform px-6"
                >
                  <div className="bg-[#5759BB] rounded-full p-4 flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(cardData[2].icon, {
                      className: "w-10 h-10 text-white",
                    })}
                  </div>
                  <div className="text-white text-lg font-bold">
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
