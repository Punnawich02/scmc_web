"use client";

import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { Building2, Car, File, Globe } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PersonnelPage: React.FC = () => {
  const t = useTranslations("PersonelPage");
  const cardData = [
    {
      title: t("car"),
      description: t("car_title"),
      link: "#car",
      icon: <Car className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("doc"),
      description: t("doc_title"),
      link: "#doc",
      icon: <File className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
    {
      title: t("cmuto"),
      description: t("cmuto_title"),
      link: "https://cmu.to/",
      icon: <Globe className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="h-full flex flex-col">
              <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-xl w-full h-full">
                <div>
                  <Building2 />
                </div>
                <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
                  {t("header")}
                </h1>
                <p className="text-gray-700 mb-4">{t("title")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 justify-center items-stretch max-w-3xl mx-auto">
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
                          <CardBody className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/40 rounded-2xl w-full h-full transition-all duration-300 hover:shadow-2xl">
                            <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center shadow-md">
                              {card.icon}
                            </div>
                            <div className="flex flex-col items-center sm:items-start text-white">
                              <h2 className="text-xl font-extrabold mb-2 drop-shadow-lg">{card.title}</h2>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonnelPage;
