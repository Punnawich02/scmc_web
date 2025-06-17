"use client";
import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Map, Building2, TreeDeciduous, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PhysicalPage() {
  const t = useTranslations("PhysicalPage");

  const cardData = [
    { title: t("map"), link: "#map", icon: <Map /> },
    { title: t("build"), link: "#build", icon: <Building2 /> },
    { title: t("tree"), link: "#tree", icon: <TreeDeciduous /> },
    { title: t("facilities"), link: "#facilities", icon: <Zap /> },
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
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[500px] flex justify-center items-center">
          {/* พื้นหลังภาพ */}
          <Image
            src="/physical.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
          {/* overlay ทับ */}
          <div className="absolute inset-0 bg-[#5759BB]/50" />

          {/* การ์ดข้อมูล */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-fit">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={card.link}>
                  <div className="flex items-center gap-4 w-[340px] h-[140px] bg-white/30 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition-transform px-6 justify-center">
                    <div className="bg-[#5759BB] rounded-full p-4 flex items-center justify-center">
                      {React.cloneElement(card.icon, {
                        className: "w-8 h-8 text-white",
                      })}
                    </div>
                    <div className="text-white text-lg font-bold">
                      {card.title}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
