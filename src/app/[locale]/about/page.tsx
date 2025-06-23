"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Image from "next/image";

export default function AboutPage() {
  // get Message from /messages/[locale] -> "AboutPage:{...}"
  const t = useTranslations("AboutPage");
  const missionKeys = ["1", "2", "3", "4", "5"];
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        {/* Page title Section */}
        <div>
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
          className="h-full"
        >
          <section className="grid md:grid-cols-2 gap-6 items-start">
            <div className="w-full">
              <Image
                src="/about/about-1.jpg"
                alt="Nature Lake"
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="text-sm space-y-4">
              <h2 className="text-2xl font-semibold">{t("about")}</h2>
              <p>{t("about_title")}</p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 space-y-2 mt-5 gap-5">
            {/* Vision Section */}
            <div className="items-center gap-2">
              <h3 className="text-2xl font-semibold">{t("vision")}</h3>
              <p className="mt-2">{t("vision_title")}</p>
            </div>

            {/* Mission Section */}
            <div className="items-center gap-2">
              <h3 className="text-2xl font-semibold">{t("mission")}</h3>
              <ol className="mt-2">
                {missionKeys.map((key, index) => (
                  <li key={key}>
                    {" "}
                    <strong>{index + 1}.</strong> {t(`mission_points.${key}`)}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Image Gallery */}
          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {["about-2.jpg", "about-3.jpg", "about-4.jpg", "XDDD.jpg"].map(
              (img, i) => (
                <div
                  key={i}
                  className="relative w-[170px] sm:w-[200px] md:w-[258px] h-[170px] sm:h-[200px] md:h-[250px] rounded-2xl overflow-hidden"
                >
                  <Image
                    src={`/about/${img}`}
                    alt={`Image ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            )}
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
