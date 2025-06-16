"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import { Wrench, MessageSquare, Shrub } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SupportPage() {
  const t = useTranslations("SupportPage");

  const cardData = [
    {
      title: t("fix"),
      description: t("fix_title"),
      link: "/support/fix",
      icon: <Wrench className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("comment"),
      description: t("comment_title"),
      link: "#comment",
      icon: (
        <MessageSquare className="w-16 h-16" color="#FFF" strokeWidth={1.5} />
      ),
    },
    {
      title: t("sdg"),
      description: t("sdg_title"),
      link: "#sdg",
      icon: <Shrub className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
              {t("header")}
            </h1>
            <p className="text-gray-700 mb-4">{t("title")}</p>
          </div>
          <div className="relative w-full min-h-[700px] sm:h-[500px] flex items-center justify-center bg-[url('/support/bg-support.jpg')] bg-cover bg-center rounded-4xl overflow-hidden">
            <div className="absolute inset-0 bg-[#1112438A] backdrop-blur-[3px]" />
            <div className="relative flex flex-col items-center justify-center gap-8 z-10">
              <div className="flex flex-col sm:flex-row gap-8">
                {cardData.slice(0, 2).map((card, index) => (
                  <Link href={card.link} key={index}>
                    <div className="w-[300px] transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
                      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-start gap-6 px-8 py-6 rounded-4xl bg-white/30 backdrop-blur-lg shadow-lg">
                        <div className="bg-[#5759BB] rounded-full w-20 h-20 flex items-center justify-center shrink-0">
                          {card.icon}
                        </div>
                        <div className="text-white text-center sm:text-left">
                          <h2 className="text-lg font-bold">{card.title}</h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <Link href={cardData[2].link}>
                  <div className="w-[300px] transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-start gap-6 px-8 py-6 rounded-4xl bg-white/30 backdrop-blur-lg shadow-lg">
                      <div className="bg-[#5759BB] rounded-full w-20 h-20 flex items-center justify-center shrink-0">
                        {cardData[2].icon}
                      </div>
                      <div className="text-white text-center sm:text-left">
                        <h2 className="text-lg font-bold">
                          {cardData[2].title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
