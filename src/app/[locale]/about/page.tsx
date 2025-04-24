"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardBody } from "@heroui/card";
import { Eye, User } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default function AboutPage() {
  // get Message from /messages/[locale] -> "AboutPage:{...}"
  const t = useTranslations("AboutPage");
  const cardData = [
    {
      title: t('vision'),
      description: t('vision_title'),
      link: "#vision",
      icon: <Eye className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t('contact'),
      description: t('contact_title'),
      link: "#contact",
      icon: <User className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t('page_title')} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto">
        {/* Page title Section */}
        <div>
          {/* Animate when loaded */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
              {t('header')}
            </h1>
            <p className="text-gray-700 mb-4">
              {t('title')}
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-center items-stretch max-w-3xl mx-auto">
          {/* Card Section */}
          {cardData.map((card, index) => (
            <Link href={card.link} key={index} className="h-full">
              {/* Animate when show on page */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.1 }}
                className="h-full"
              >
                <Card
                  key={index}
                  className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer h-full flex flex-col"
                >
                  <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-xl w-full h-full">
                    <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h2 className="text-lg font-bold text-white text-center sm:text-left min-h-[1rem]">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white text-center sm:text-left flex-grow">
                      {card.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
