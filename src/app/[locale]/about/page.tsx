"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@heroui/card";
import { Eye, User } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Image from "next/image";

export default function AboutPage() {
  // get Message from /messages/[locale] -> "AboutPage:{...}"
  const t = useTranslations("AboutPage");
  const missionKeys = ["1", "2", "3", "4", "5"];
  const departments = [
    {
      title: "ฝ่ายงานแผนเทค",
      members: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
      ],
    },
    {
      title: "ฝ่ายธุรการ",
      members: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
      ],
    },
    {
      title: "ฝ่ายอาคารสถานที่",
      members: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
      ],
    },
    {
      title: "ฝ่ายอื่น ๆ",
      members: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
      ],
    },
    {
      title: "ฝ่ายอื่น ๆ",
      members: [
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem Ipsum",
      ],
    },
  ];

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
            <h1 className="text-5xl font-bold mb-4 mt-4 text-black">
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
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            <div className="text-sm text-gray-800 space-y-4">
              <h2 className="text-xl font-semibold">
                ศูนย์บริหารจัดการเมืองเพื่อความยั่งยืน
              </h2>
              <p>{t("about_title")}</p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 space-y-2 mt-5 gap-5">
            {/* Vision Section */}
            <div className="items-center gap-2">
              <h3 className="text-lg font-semibold">{t("vision")}</h3>
              <p>{t("vision_title")}</p>
            </div>

            {/* Mission Section */}
            <div className="items-center gap-2">
              <h3 className="text-lg font-semibold">{t("mission")}</h3>
              <ol>
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
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {["about-2.jpg", "about-3.jpg", "about-4.jpg", "XDDD.jpg"].map(
              (img, i) => (
                <div
                  key={i}
                  className="relative w-[258px] h-[250px] rounded-xl overflow-hidden"
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

          {/* Organization Chart */}
          <section className="text-sm space-y-4 mt-5">
            <h3 className="text-lg font-semibold">โครงสร้างศูนย์</h3>
            <div className="flex flex-col items-center relative">
              <div className="bg-[#9799E7] text-white px-4 py-2 rounded-full z-10">
                {t(`chancellor`)}
              </div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="bg-[#9799E7] text-white px-4 py-2 rounded-full z-10">
                {t(`director1`)}
              </div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="bg-[#9799E7] text-white px-4 py-2 rounded-full z-10">
                {t(`director2`)}
              </div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="flex flex-wrap justify-center gap-4 relative">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center relative"
                  >
                    <div className="bg-indigo-200 text-black px-3 py-2 rounded-full font-medium">
                      {dept.title}
                    </div>
                    <div className="w-0.5 h-4 bg-gray-400"></div>
                    <div className="bg-indigo-100 rounded-xl p-4 w-40 shadow">
                      <ul className="text-xs space-y-1">
                        {dept.members.map((name, i) => (
                          <li key={i}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
