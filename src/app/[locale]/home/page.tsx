"use client";

import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cctv, FileText, Waves, Building, Map } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

// Below this line are Mock-up Datas
const News = [
  {
    title: "กิจกรรมพิเศษสำหรับนักศึกษา CMU ปี 1-4",
    description:
      "กิจกรรมพิเศษสำหรับนักศึกษา มช. ประจำปีการศึกษา 2025 เพื่อส่งเสริมการเรียนรู้และพัฒนาทักษะนอกห้องเรียน",
    imageUrl: "/news/news_1.png",
    link: "#news1",
  },
  {
    title: "ข่าวประชาสัมพันธ์จากหน่วยงานต่างๆ",
    description: "ข่าวประชาสัมพันธ์จากหน่วยงานต่างๆ ของมหาวิทยาลัยเชียงใหม่",
    imageUrl: "/news/news_2.png",
    link: "#news2",
  },
  {
    title: "ประกาศจากหน่วยงานรักษาความปลอดภัย",
    description: "ประกาศจากหน่วยงานรักษาความปลอดภัยเกี่ยวกับการเข้า-ออก มช.",
    imageUrl: "/news/news_3.png",
    link: "#news3",
  },
  {
    title: "ข่าวสารการจราจรในเขต มช.",
    description: "ข่าวสารการจราจรในเขต มช. เพื่อความสะดวกในการเดินทาง",
    imageUrl: "/news/news_4.png",
    link: "#news4",
  },
  {
    title: "กิจกรรมพิเศษสำหรับนักศึกษา CMU ปี 1-4",
    description:
      "กิจกรรมพิเศษสำหรับนักศึกษา มช. ประจำปีการศึกษา 2025 เพื่อส่งเสริมการเรียนรู้และพัฒนาทักษะนอกห้องเรียน",
    imageUrl: "/news/news_1.png",
    link: "#news1",
  },
];

const PublicDoc = [
  {
    title: "เอกสาร A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dignissimos eum, harum modi porro commodi rem quae quo neque corporis facere dolores repellendus officia delectus eligendi quam vitae. Placeat, quasi.",
    imageUrl: "/news/news_1.png",
    link: "#DocA",
  },
  {
    title: "เอกสาร B",
    description: "เอกสาร B",
    imageUrl: "/news/news_2.png",
    link: "#DocB",
  },
  {
    title: "เอกสาร C",
    description: "เอกสาร C",
    imageUrl: "/news/news_3.png",
    link: "#DocC",
  },
];

const Block = [
  {
    title: "บทความ A",
    description: "บทความ A",
    imageUrl: "/news/news_2.png",
    link: "#BlogA",
  },
  {
    title: "บทความ B",
    description: "บทความ B",
    imageUrl: "/news/news_1.png",
    link: "#BlogB",
  },
];
// End of Mock-up Datas

type TabType = "news" | "documents" | "articles";

const tabData: Record<
  TabType,
  { title: string; description: string; imageUrl: string; link: string }[]
> = {
  news: News,
  documents: PublicDoc,
  articles: Block,
};

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("news");
  const tabs: TabType[] = ["news", "documents", "articles"];
  const locale = useLocale();

  const t = useTranslations("HomePage");

  const HighlightServices = [
    {
      icon: <Map className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
      link: "/service/transport",
      label: t("map"),
    },
    {
      icon: <Cctv className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
      link: "/service/security",
      label: t("cctv"),
    },
    {
      icon: (
        <FileText className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />
      ),
      link: "/service/data",
      label: t("data"),
    },
    {
      icon: <Waves className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
      link: "/service/utility",
      label: t("util"),
    },
    {
      icon: (
        <Building className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />
      ),
      link: "/service/building",
      label: t("build"),
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        <div className="max-w-[80%] mx-auto">
          {/* Vehicle Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="relative w-full max-w-7xl mx-auto mb-6">
              <div className="relative w-full h-[300px] sm:h-[400px]">
                <Image
                  src="/DSC06224.jpg"
                  alt="Angkaew"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r to-transparent flex flex-col justify-center px-6 sm:px-8">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                    {t("vehicle")}
                  </h2>
                  <p className="text-white text-xs sm:text-sm sm:text-base max-w-md mb-6">
                    {t("vehicle_title")}
                  </p>
                  <Link
                    href="/api/login"
                    className="w-full sm:w-auto"
                    style={{ maxWidth: "200px" }}
                  >
                    <button className="bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-max hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                      {t("vehicle_btn")}
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Highlight Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="pb-6">
              <div className="relative mx-auto mt-10 max-w-7xl">
                <div className="grid sm:flex bg-[#FAAF39D1] rounded-xl py-6 px-6 shadow-lg flex-wrap justify-center sm:justify-around gap-6 text-center text-sm font-medium">
                  {HighlightServices.map((service, index) => (
                    <Link key={index} href={`/${locale}${service.link}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.1 }}
                      >
                        <div
                          key={index}
                          className="flex flex-col items-center min-w-[100px] max-w-[140px] hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out sm:flex-grow sm:max-w-none"
                        >
                          <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center">
                            {service.icon}
                          </div>
                          <span className="text-white pt-2">
                            {service.label}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="absolute -top-4 left-0 bg-white text-yellow-700 px-4 py-2 rounded-tr-xl rounded-bl-xl shadow text-sm ml-1 font-semibold">
                  Highlight
                  <br />
                  Services
                </div>
              </div>
            </section>
          </motion.div>

          {/* News Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <section className="px-6 py-4 bg-white rounded-md max-w-7xl mx-auto">
              <div className="mb-6">
                {tabs.map((text, index) => (
                  <span
                    key={index}
                    className={`text-sm ml-4 pb-1 inline-block hover:cursor-pointer ${
                      selectedTab === text
                        ? "font-bold border-b-2 border-indigo-600 text-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setSelectedTab(text)}
                  >
                    {t(text)}
                  </span>
                ))}
              </div>

              {/* News Data */}
              <motion.div
                key={selectedTab} // 💡 This causes motion.div to re-render and animate on tab change
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="gap-4 mb-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                  {tabData[selectedTab]
                    .slice(0, 4) // Show only the first 4 news items
                    .map((news, index) => (
                      <Link key={index} href={news.link}>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col h-full">
                          <Image
                            src={news.imageUrl}
                            alt={news.title}
                            width={271}
                            height={163}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3 flex flex-col flex-grow">
                            <h4 className="text-sm font-medium mb-1 text-black">
                              {news.title}
                            </h4>
                            <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow min-h-[3rem]">
                              {news.description.length > 140
                                ? `${news.description.slice(0, 140)}...`
                                : news.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>

              <div className="flex justify-end">
                <Link href="#">
                  <button className="bg-amber-400 text-gray-700 px-4 py-1 rounded-xl text-sm hover:cursor-pointer hover:bg-amber-300 hover:scale-105 transition-transform duration-300 ease-in-out">
                    {t("more")}
                  </button>
                </Link>
              </div>
            </section>
          </motion.div>

          {/* CMU Mobile Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <section className="px-6 py-8 bg-white flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/smartphone.png"
                  width={400}
                  height={400}
                  alt="Smartphone"
                  className="h-48 object-contain"
                />
              </div>
              <div className="md:w-1/2 p-4">
                <Image
                  src="/cmu_mobile.svg"
                  width={400}
                  height={150}
                  alt="CMU Mobile Map"
                  className="w-full object-contain rounded-xl hover:shadow-lg hover:cursor-pointer sm:scale-100 sm:hover:scale-105 scale-150 hover:scale-155 transition-transform duration-300 ease-in-out"
                />
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
