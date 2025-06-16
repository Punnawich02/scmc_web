"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Database,
  BusFront,
  ShieldUser,
  Building,
  HousePlug,
  UserRound,
} from "lucide-react";

export default function ServicePage() {
  const t = useTranslations("OurService");
  const locale = useLocale();

  const cardData = [
    {
      title: t("data"),
      link: "/data",
      description: t("data_title"),
      icon: <Database />,
    },
    {
      title: t("transport"),
      link: "/transport",
      description: t("transport_title"),
      icon: <BusFront />,
    },
    {
      title: t("security"),
      link: "/security",
      description: t("security_title"),
      icon: <ShieldUser />,
    },
    {
      title: t("build"),
      link: "/building",
      description: t("build_title"),
      icon: <Building />,
    },
    {
      title: t("util"),
      link: "/utility",
      description: t("util_title"),
      icon: <HousePlug />,
    },
    {
      title: t("list_format"),
      link: "/list_format",
      description: t("list_format_title"),
      icon: <HousePlug />,
    },
    {
      title: t("personel"),
      link: "/personnel",
      description: t("personel_title"),
      icon: <UserRound />,
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
          className="w-full mb-8"
        >
          <h1 className="text-5xl font-extrabold text-[#6869AA] mb-4 w-full text-left">
            {t("header")}
          </h1>
          <p className="text-gray-700 text-lg">{t("title")}</p>
        </motion.div>

        {/* ภาพพื้นหลัง */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[600px] flex flex-col items-center justify-center">
          <Image
            src="/service-bg.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-[#1F4788]/60" />

          {/* การ์ด 6 ใบแรก */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-fit px-8">
            {cardData.slice(0, 6).map((card, index) => (
              <Link href={`/${locale}/service${card.link}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex items-center gap-4 w-[280px] h-[120px] bg-white/40 backdrop-blur-md rounded-3xl shadow-lg hover:scale-105 transition-transform px-6"
                >
                  <div className="bg-[#5759BB] rounded-full p-4 flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(card.icon, {
                      className: "w-10 h-10 text-white",
                    })}
                  </div>
                  <div className="text-white text-lg font-bold">
                    {card.title}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* การ์ดใบสุดท้าย (อยู่กลาง) */}
          {cardData.length > 6 && (
            <div className="relative z-10 mt-6 flex justify-center w-full">
              <Link href={`/${locale}/service${cardData[6].link}`}>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 6 * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex items-center gap-4 w-[280px] h-[120px] bg-white/40 backdrop-blur-md rounded-3xl shadow-lg hover:scale-105 transition-transform px-6"
                >
                  <div className="bg-[#5759BB] rounded-full p-4 flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(cardData[6].icon, {
                      className: "w-10 h-10 text-white",
                    })}
                  </div>
                  <div className="text-white text-lg font-bold">
                    {cardData[6].title}
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