"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Map, Building2, TreeDeciduous, Zap } from "lucide-react";
import Image from "next/image";

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
        <h1 className="text-5xl font-extrabold text-[#6869AA] mb-8 w-full text-left">
          {t("header")}
        </h1>

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
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10 w-fit">
            {cardData.map((card, index) => (
              <Link href={card.link} key={index}>
                <div className="flex items-center justify-center gap-8 w-[500px] h-[140px] bg-white/40 backdrop-blur-md rounded-3xl shadow-lg hover:scale-105 transition-transform px-10">
                  <div className="bg-[#5759BB] rounded-full p-6 flex items-center justify-center">
                    {React.cloneElement(card.icon, { className: "w-10 h-10 text-white" })}
                  </div>
                  <div className="text-[#1F1F1F] text-2xl sm:text-3xl font-bold">
                    {card.title}
                  </div>
                </div>


              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
