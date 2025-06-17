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
      <Header title={t("page_title")}/>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
        {/* hero */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 overflow-hidden rounded-3xl bg-[#9799E7] px-6 py-8 shadow-md sm:px-10 sm:py-12">
            {/* icon */}
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <ShieldUser className="h-10 w-10 text-white" aria-hidden="true" />
            </div>

            {/* heading + subtitle */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:flex-1">
              <h1 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                {t("header")}
              </h1>
              <p className="mt-1 text-sm text-white/90 sm:text-base lg:mt-0 lg:ml-auto lg:text-right">
                {t("table")}
              </p>
            </div>
          </div>
        </motion.section>

        {/* tabs */}
        <section>
          {/* tab list */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
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
                  <p className="text-gray-700">
                    {t("transit_placeholder")}
                  </p>
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
