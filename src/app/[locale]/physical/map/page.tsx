"use client";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import {
  Building2
} from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

const MapPage: React.FC = () => {
  const t = useTranslations("CampusMap");

  return (
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
      <Header title={t("header")} />
      <main className="flex-1 flex flex-col justify-start px-4 py-8 md:py-12">
        <div className="w-full mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* กล่องหัวเรื่อง */}
            <div className="relative rounded-2xl p-6 shadow-lg bg-[url('/physical.jpg')] bg-cover bg-center h-32">
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

            {/* Open Street Map */}
            <div className="flex justify-center w-full">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=98.94857,18.79758,98.95803,18.80656&layer=mapnik"
                className="w-full h-[500px] rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapPage;
