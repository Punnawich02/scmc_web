"use client";

import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BusFront,
  Mountain,
  Database,
  HousePlug,
  Building,
  CarFront,
} from "lucide-react";
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
  const [newsLimit, setNewsLimit] = useState(4);
  const pageSize = 4;

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
          SourceLinkThai: string | number;
        };

        const isThai = locale === "th";

        const mapped: NewsItem[] = (api.data as NewsApiItem[]).map((n) => ({
          title: isThai
            ? n.TitleThai ?? n.TitleEnglish ?? "ไม่มีชื่อ"
            : n.TitleEnglish ?? n.TitleThai ?? "Untitled",
          description:
            (isThai
              ? n.DetailThai ?? n.DetailEnglish
              : n.DetailEnglish ?? n.DetailThai
            )
              ?.replace(/<[^>]+>/g, "")
              .slice(0, 200) ?? "",
          imageUrl:
            n.Images?.find((img) => img.IsCover)?.SourceLink ??
            n.Images?.[0]?.SourceLink ??
            "/placeholder.jpg",
          link: String(n.SourceLinkThai),
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
      icon: (
        <BusFront
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: `/${locale}/service/transport`,
      label: t("map"),
    },
    {
      icon: (
        <Mountain
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: process.env.NEXT_PUBLIC_CMU_BUILDING,
      label: t("request"),
    },
    {
      icon: (
        <Database
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: `/${locale}/service/data`,
      label: t("data"),
    },
    {
      icon: (
        <HousePlug
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: `/${locale}/service/utility`,
      label: t("util"),
    },
    {
      icon: (
        <Building
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: process.env.NEXT_PUBLIC_CMU_BOOKING_AREA,
      label: t("reserve"),
    },
  ];

  const totalNews = tabData.news.length;
  const hasMore = selectedTab === "news" && newsLimit < totalNews;

  /* ------------------------------------------------------------------------ */
  /*                                 JSX                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8  py-6 w-full">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Vehicle Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="w-full max-w-7xl mx-auto mb-6 px-4 sm:px-6">
              <div
                className={`relative w-full ${
                  locale === "en"
                    ? "h-[450px] sm:h-[600px]"
                    : "h-[400px] sm:h-[600px]"
                }`}
              >
                <Image
                  src="/DSC06224.jpg"
                  alt="Angkaew"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl sm:rounded-3xl md:rounded-4xl"
                  priority
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent sm:bg-gradient-to-r sm:from-black/40 sm:via-black/20 sm:to-transparent rounded-2xl sm:rounded-3xl md:rounded-4xl" />

                {/* Content overlay */}
                <div className="pt-10 inset-0 flex flex-col justify-center px-4 xs:px-5 sm:px-8 md:px-10">
                  <div className="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl">
                    <h2 className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                      {t("vehicle")}
                    </h2>

                    <p className="text-white/90  text-xs xs:text-xs sm:text-sm md:text-base mb-4 xs:mb-5 sm:mb-6 leading-relaxed drop-shadow-md max-w-[250px] xs:max-w-[280px] sm:max-w-md">
                      {t("vehicle_title")}
                    </p>

                    <Link href="/api/login" className="relative z-20">
                      <button className="flex  items-center justify-center bg-[#380478] hover:bg-[#4a0a96] font-bold text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl text-xs xs:text-xs sm:text-sm hover:cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] relative z-20">
                        <CarFront className="mr-1 xs:mr-1.5 sm:mr-2 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="whitespace-nowrap">
                          {t("vehicle_btn")}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
                {/* Desktop Version */}
                <div className="absolute bottom-0  mx-15 hidden sm:grid grid-cols-7  bg-[#6869AA]/70 backdrop-blur-lg rounded-3xl items-center  translate-y-12">
                  <h2 className="text-white col-span-2 text-center text-lg sm:text-xl lg:text-2xl font-semibold">
                    Highlight <br></br>
                    Services
                  </h2>
                  {HighlightServices.map((service, index) => (
                    <Link key={index} href={`${service.link}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="group"
                      >
                        <div className="flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-2 pb-4 relative group h-24 sm:h-28 lg:h-32">
                          {/* Yellow background block - แสดงตอน hover */}
                          <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl -mt-8 sm:-mt-10 lg:-mt-16 pt-8 sm:pt-10 lg:pt-16"></div>

                          {/* Icon Container - ยกขึ้นเหนือขอบของ container */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 -mt-8 sm:-mt-10 lg:-mt-12 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative z-10">
                            <div className="text-[#6869AA] text-xl sm:text-2xl lg:text-3xl transition-colors duration-300">
                              {service.icon}
                            </div>
                          </div>

                          {/* Label */}
                          <span className="text-white   text-xs sm:text-sm lg:text-base font-medium text-center leading-tight transition-colors duration-300 mt-2 relative z-10">
                            {service.label}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
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
              <div className="relative mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* mobile Version */}
                <div className="block sm:hidden bg-[#6869AA] rounded-xl sm:rounded-2xl lg:rounded-3xl py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
                  {/* Header */}
                  <div className="text-left sm:text-center mb-6 sm:mb-8 lg:mb-10">
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                      Highlight Services
                    </h2>
                  </div>

                  {/* Mobile Layout - Vertical List */}
                  <div className="block  space-y-3 ">
                    {HighlightServices.map((service, index) => (
                      <Link key={index} href={`${service.link}`}>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          className="group pt-3"
                        >
                          <div
                            className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white`}
                          >
                            {/* Icon */}
                            <div
                              className={`w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-md hover:shadow-lg ${
                                index === 0 ? "text-white" : "text-[#6869AA]"
                              }`}
                            >
                              {service.icon}
                            </div>

                            {/* Label */}
                            <span
                              className={`font-medium text-base text-[#6869AA]`}
                            >
                              {service.label}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
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
                      {tabData[selectedTab]
                        .slice(
                          0,
                          selectedTab === "news"
                            ? newsLimit
                            : tabData[selectedTab].length
                        )
                        .map((item, index) => (
                          <Link
                            key={item.link ?? index}
                            href={item.link}
                            className={loadingNews ? "pointer-events-none" : ""}
                            prefetch={false}
                          >
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col h-full w-full">
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
                                    ? `${item.description.slice(0, 140)}…`
                                    : item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-end">
                {hasMore && (
                  <button
                    disabled={loadingNews}
                    onClick={() =>
                      setNewsLimit((prev) =>
                        Math.min(prev + pageSize, totalNews)
                      )
                    }
                    className="font-bold bg-amber-400 text-gray-700 px-4 py-1 rounded-xl text-sm hover:bg-amber-300 hover:scale-105 transition-transform duration-300 ease-in-out disabled:opacity-50"
                  >
                    {loadingNews ? t("loading") : t("more")}
                  </button>
                )}
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
