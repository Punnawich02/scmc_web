"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldUser } from "lucide-react";

const SecurityPage: React.FC = () => {
  const t = useTranslations("SecurityPage");

  const tabs = [
    {
      key: "cctv_request",
      label: t("cctv_request", { defaultValue: "ภาพรวม" }),
    },
    {
      key: "accident_data",
      label: t("accident_data", { defaultValue: "เจ้าหน้าที่" }),
    },
    { key: "transit", label: t("transit", { defaultValue: "รายงาน" }) },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
        {/* hero */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="rounded-2xl bg-[#8F90E5] p-6 shadow-lg">
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start">
              {/* Icon */}
              <div className="bg-[#5759BB] rounded-full p-4 shadow-lg sm:absolute sm:top-0 sm:left-0 mb-4 sm:mb-0">
                <ShieldUser className="w-10 h-10 text-white" />
              </div>

              {/* ข้อความ */}
              <div className="sm:ml-24 text-center sm:text-left">
                <h1 className="text-white font-extrabold text-3xl leading-snug mb-2">
                  {t("header")}
                </h1>
                <p className="text-white/90 text-base max-w-xl">{t("title")}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* tabs */}
        <section>
          {/* tab list */}
          <div className="flex flex-wrap gap-2 border-b-3 border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative rounded-t-md px-4 py-2 text-sm font-medium transition-all duration-300 sm:text-base cursor-pointer
                  ${
                    activeTab === tab.key
                      ? "text-bold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#6869AA] after:transition-all after:duration-300"
                      : "text-gray-400 hover:text-gray-600 hover:after:absolute hover:after:inset-x-0 hover:after:-bottom-0.5 hover:after:h-0.5 hover:after:bg-[#6869AAD1] hover:after:transition-all hover:after:duration-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* tab panels */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeTab === "cctv_request" && (
                  <p className="text-gray-700">
                    {t("cctv_request_placeholder")}
                  </p>
                )}
                {activeTab === "accident_data" && (
                  <p className="text-gray-700">
                    {t("accident_data_placeholder")}
                  </p>
                )}
                {activeTab === "transit" && (
                  <p className="text-gray-700">{t("transit_placeholder")}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityPage;
