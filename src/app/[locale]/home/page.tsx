"use client";

import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BusFront, Mountain, Database, HousePlug, Building, CarFront } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                                Data Types                                  */
/* -------------------------------------------------------------------------- */

type NewsItem = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};

type TabType = "news" | "documents" | "articles";

/* -------------------------------------------------------------------------- */
/*                             Mock‑up Datasets                               */
/* -------------------------------------------------------------------------- */

const PublicDoc: NewsItem[] = [
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

const Block: NewsItem[] = [
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

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  /* --------------------------- state: news / tab --------------------------- */
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [, setErrorNews] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState<TabType>("news");
  const tabs: TabType[] = ["news", "documents", "articles"];

  
  /* --------------------------- fetch news on mount ------------------------- */
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true); // 👉 start loading (prevents page jump)
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const api = await res.json();

        type NewsApiItem = {
          TitleThai?: string;
          TitleEnglish?: string;
          DetailThai?: string;
          DetailEnglish?: string;
          Images?: { IsCover?: boolean; SourceLink?: string }[];
          NewsID: string | number;
        };

        const isThai = locale === "th";

        const mapped: NewsItem[] = (api.data as NewsApiItem[]).map((n) => ({
          title: isThai
            ? n.TitleThai ?? n.TitleEnglish ?? "ไม่มีชื่อ"
            : n.TitleEnglish ?? n.TitleThai ?? "Untitled",
          description:
            (
              isThai ? n.DetailThai ?? n.DetailEnglish : n.DetailEnglish ?? n.DetailThai
            )
              ?.replace(/<[^>]+>/g, "")
              .slice(0, 200) ?? "",
          imageUrl:
            n.Images?.find((img) => img.IsCover)?.SourceLink ??
            n.Images?.[0]?.SourceLink ??
            "/placeholder.jpg",
          link: `/news/${n.NewsID}`,
        }));

        setNewsItems(mapped);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorNews(err.message);
        else setErrorNews("An unknown error occurred");
      } finally {
        setLoadingNews(false); // 👉 stop loading
      }
    };

    fetchNews();
  }, [locale]); // 💡 re‑fetch when language changes

  /* ------------------------- group data by tab ----------------------------- */
  const tabData: Record<TabType, NewsItem[]> = {
    news: newsItems,
    documents: PublicDoc,
    articles: Block,
  };

  /* --------------------------- highlight services -------------------------- */
  const HighlightServices = [
    {
      icon: <BusFront className="w-16 h-16" color="#6869AA" strokeWidth={2} />,
      link: `/${locale}/service/transport`,
      label: t("map"),
    },
    {
      icon: <Mountain className="w-16 h-16" color="#6869AA" strokeWidth={2} />,
      link: "https://mis.cmu.ac.th/CMUBuildings/",
      label: t("request"),
    },
    {
      icon: <Database className="w-16 h-16" color="#6869AA" strokeWidth={2} />,
      link: `/${locale}/service/data`,
      label: t("data"),
    },
    {
      icon: <HousePlug className="w-16 h-16" color="#6869AA" strokeWidth={2} />,
      link: `/${locale}/service/utility`,
      label: t("util"),
    },
    {
      icon: <Building className="w-16 h-16" color="#6869AA" strokeWidth={2} />,
      link: "https://buildings.oop.cmu.ac.th/bookingarea/",
      label: t("reserve"),
    },
  ];

  /* ------------------------------------------------------------------------ */
  /*                                 JSX                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        <div className="w-full max-w-7xl mx-auto px-4">
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
                  className="rounded-4xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r to-transparent flex flex-col justify-center px-6 sm:px-8">
                  <h2 className="text-black text-2xl sm:text-3xl font-bold mb-4">
                    {t("vehicle")}
                  </h2>
                  <p className="text-black text-xs sm:text-sm sm:text-base max-w-md mb-6">
                    {t("vehicle_title")}
                  </p>
                  <Link href="/api/login" className="w-full sm:w-auto" style={{ maxWidth: "200px" }}>
                    <button className="flex bg-[#380478] font-bold text-white px-4 py-2 rounded-xl text-sm sm:text-base w-max hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                      <CarFront className="mr-2" />
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
                    <Link key={index} href={`${service.link}`}>
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
                          <span className="text-white pt-2">{service.label}</span>
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
              {/* Tabs */}
              <div className="mb-6">
                {tabs.map((text, index) => (
                  <span
                    key={index}
                    className={`text-sm ml-4 pb-1 inline-block hover:cursor-pointer ${
                      selectedTab === text
                        ? "font-bold border-b-4 border-[#6869AA] text-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setSelectedTab(text)}
                  >
                    {t(text)}
                  </span>
                ))}
              </div>

              {/* News Data or Skeleton */}
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="gap-4 mb-6"
              >
                {selectedTab === "news" && loadingNews ? (
                  /* ------------------------ Skeleton while loading ----------------------- */
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-200/60 rounded-xl h-56 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  /* ----------------------- Actual Content ------------------------------- */
                  <div className="w-full min-h-[240px] mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                      {/* Always show data in the first available slots */}
                      {Array.from({ length: 4 }).map((_, index) => {
                        const item = tabData[selectedTab][index];
                        
                        if (item) {
                          // Render actual content
                          return (
                            <Link
                              key={`content-${index}`}
                              href={item.link}
                              className={loadingNews ? "pointer-events-none" : ""}
                              prefetch={false}
                            >
                              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col h-full w-full">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  width={271}
                                  height={163}
                                  className="w-full h-40 object-cover"
                                />
                                <div className="p-3 flex flex-col flex-grow">
                                  <h4 className="text-sm font-medium mb-1 text-black line-clamp-2 min-h-[3em]">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow min-h-[3rem]">
                                    {item.description.length > 140
                                      ? `${item.description.slice(0, 140)}...`
                                      : item.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        } else {
                          // Render invisible placeholder to maintain grid structure
                          return (
                            <div key={`placeholder-${index}`} className="invisible" aria-hidden="true">
                              <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col h-full w-full">
                                <div className="w-full h-40 bg-gray-100"></div>
                                <div className="p-3 flex flex-col flex-grow">
                                  <div className="text-sm font-medium mb-1 min-h-[3em] bg-gray-100 rounded"></div>
                                  <div className="text-xs mb-3 flex-grow min-h-[3rem] bg-gray-100 rounded"></div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-end">
                <Link href="/news" prefetch={false} className={loadingNews ? "pointer-events-none" : ""}>
                  <button
                    disabled={loadingNews}
                    className="font-bold bg-amber-400 text-gray-700 px-4 py-1 rounded-xl text-sm hover:cursor-pointer hover:bg-amber-300 hover:scale-105 transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {t("more")}
                  </button>
                </Link>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}