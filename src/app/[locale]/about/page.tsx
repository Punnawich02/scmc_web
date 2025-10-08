"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default function AboutPage() {
  // get Message from /messages/[locale] -> "AboutPage:{...}"
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        {/* Page title Section */}
        <div className="w-full">
          {/* Animate when loaded */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-1 mt-5 text-[#6869AA]">
              {t("header")}
            </h1>
          </motion.div>
        </div>
        {/* Animate when show on page */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex-1 w-full"
        >
          <div className="w-full max-w-full">
            <div className="relative w-full">
              <Image
                src={
                  locale === "th"
                    ? "/about/about_th.svg"
                    : "/about/about_en.svg"
                }
                alt={locale === "th" ? "about_th" : "about_en"}
                width={0}
                height={0}
                className="w-full h-auto object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}