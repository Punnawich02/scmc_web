"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import { Wrench, MessageSquare, Shrub } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SupportPage() {
  const t = useTranslations("SupportPage");
  
  const cardData = [
    {
      title: t('fix'),
      description: t('fix_title'),
      link: "/support/fix",
      icon: <Wrench className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t('comment'),
      description: t('comment_title'),
      link: "#comment",
      icon: (
        <MessageSquare className="w-16 h-16" color="#FFF" strokeWidth={1.5} />
      ),
    },
    {
      title: "SDG and Carbon Neutrality",
      description: t('sdg_title'),
      link: "#sdg",
      icon: <Shrub className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t('page_title')} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        <div>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-stretch max-w-5xl mx-auto">
          {cardData.map((card, index) => (
            <Link href={card.link} key={index} className="h-full">
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
                  <CardBody className="flex flex-col items-center md:items-start gap-4 p-6 bg-[#9799E7] rounded-xl w-full h-full">
                    <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h2 className="text-lg font-bold text-white text-center sm:text-left">
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
