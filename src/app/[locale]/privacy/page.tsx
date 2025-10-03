"use client";
import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

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

          <div className="w-full mt-6">
            <iframe
              src="/privacy/privacy.html"
              title="Privacy Policy"
              className="w-full h-screen border-0"
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
