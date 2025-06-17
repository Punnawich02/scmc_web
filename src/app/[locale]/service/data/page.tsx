"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Database } from "lucide-react";
import Image from "next/image";

const graphOptions = [
  { key: "option1", src: "/graph.svg", alt: "Graph 1" },
  { key: "option2", src: "/graph.svg", alt: "Graph 2" },
  { key: "option3", src: "/graph.svg", alt: "Graph 3" },
];

const DataPage: React.FC = () => {
  const t = useTranslations("DataPage");
  const [selectedGraph, setSelectedGraph] = useState(graphOptions[0]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-2 sm:px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#9799E7] rounded-3xl px-4 py-8 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-center gap-6 shadow-xl"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#] flex items-center justify-center flex-shrink-0 shadow-lg">
            <Database className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-0 whitespace-nowrap drop-shadow-lg">
              {t("header")}
            </h1>
            <p className="text-base sm:text-lg sm:ml-8 sm:flex-1 text-white/90 mt-2 sm:mt-0">
              {t("table")}
            </p>
          </div>
        </motion.div>

        {/* Dropdown */}
        <div className="mt-8 w-full">
            <details className="w-full group">
            <summary className="w-full flex items-center justify-between bg-[#E9EAFF] border-3 border-[#8586D1] rounded-full px-4 py-2 shadow hover:shadow-md focus:outline-none cursor-pointer list-none">
              <h2 className="text-base font-semibold text-[#22223b] flex-1 text-center">
              {t(selectedGraph.key)}
              </h2>
              <ChevronDown className="text-[#6366F1] ml-1 w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 px-4 py-2 bg-white rounded-2xl shadow">
              <ul className="space-y-2">
              {graphOptions.map((option) => (
                <li key={option.key}>
                <button
                  className={`w-full text-left font-medium ${
                  selectedGraph.key === option.key
                    ? "text-[#6366F1]"
                    : "text-[#22223b] hover:text-[#6366F1]"
                  }`}
                  onClick={() => setSelectedGraph(option)}
                  type="button"
                >
                  {t(option.key)}
                </button>
                </li>
              ))}
              </ul>
            </div>
            </details>

          {/* Content */}
          <div className="mt-6">
            <div className="flex flex-row justify-center">
              <Image
                src={selectedGraph.src}
                width={1000}
                height={250}
                alt={selectedGraph.alt}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataPage;
