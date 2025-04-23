"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";

const SecurityPage: React.FC = () => {
  const t = useTranslations("SecurityPage");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={t('page_title')} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
            {t("header")}
          </h1>
          <p className="text-gray-700 mb-4">{t("title")}</p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;
