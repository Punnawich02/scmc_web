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
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800">
      <Header title={t("page_title")} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
        {/* Header Card */}
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
                <Database className="w-10 h-10 text-white" />
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
                            : "text-[#22223b] hover:text-[#6366F1] hover:cursor-pointer"
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
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default DataPage;
