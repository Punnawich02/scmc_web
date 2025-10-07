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

type NewsItem = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
};
type TabType = "news" | "documents";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [publicDocItems, setPublicDocItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [, setErrorNews] = useState<string | null>(null);
  const [newsLimit, setNewsLimit] = useState(4);
  const pageSize = 4;
  const [selectedTab, setSelectedTab] = useState<TabType>("news");
  const tabs: TabType[] = ["news", "documents"];

  useEffect(() => {
    const fetchData = async () => {
      setLoadingNews(true);
      try {
        const newsRes = await fetch("/api/news");
        if (!newsRes.ok) throw new Error("Failed to fetch news");
        const newsApi = await newsRes.json();
        
        type NewsApiItem = {
          TitleThai?: string;
          TitleEnglish?: string;
          DetailThai?: string;
          DetailEnglish?: string;
          Images?: { IsCover?: boolean; SourceLink?: string }[];
          SourceLinkThai: string | number;
        };

        const isThai = locale === "th";
        const mappedNews: NewsItem[] = (newsApi.data as NewsApiItem[]).map(
          (n) => ({
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
          })
        );
        setNewsItems(mappedNews);

        const docRes = await fetch("/api/public_doc");
        if (!docRes.ok) throw new Error("Failed to fetch public documents");
        const docApi = await docRes.json();

        type PublicDocItem = {
          id: number;
          titleTh: string;
          titleEn: string;
          descriptionTh: string;
          descriptionEn: string;
          linkUrl: string;
          isActive: boolean;
        };

        const mappedDocs: NewsItem[] = docApi.map((doc: PublicDocItem) => ({
          title: isThai ? doc.titleTh : doc.titleEn,
          description: isThai ? doc.descriptionTh : doc.descriptionEn,
          imageUrl: "",
          link: doc.linkUrl || "#",
        }));
        setPublicDocItems(mappedDocs);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorNews(err.message);
        else setErrorNews("An unknown error occurred");
      } finally {
        setLoadingNews(false);
      }
    };
    fetchData();
  }, [locale]);

  const tabData: Record<TabType, NewsItem[]> = {
    news: newsItems,
    documents: publicDocItems,
  };

  const HighlightServices = [
    {
      icon: <BusFront className="w-full h-full" color="#6869AA" strokeWidth={2} />,
      link: process.env.NEXT_PUBLIC_CMU_TIMETABLE,
      label: t("map"),
      isExt: true,
    },
    {
      icon: <Mountain className="w-full h-full" color="#6869AA" strokeWidth={2} />,
      link: process.env.NEXT_PUBLIC_CMU_BUILDING,
      label: t("request"),
      isExt: true,
    },
    {
      icon: <Database className="w-full h-full" color="#6869AA" strokeWidth={2} />,
      link: `/${locale}/service/data`,
      label: t("data"),
      isExt: false,
    },
    {
      icon: <HousePlug className="w-full h-full" color="#6869AA" strokeWidth={2} />,
      link: `/${locale}/service/utilities`,
      label: t("util"),
      isExt: false,
    },
    {
      icon: <Building className="w-full h-full" color="#6869AA" strokeWidth={2} />,
      link: process.env.NEXT_PUBLIC_CMU_BOOKING_AREA,
      label: t("reserve"),
      isExt: true,
    },
  ];

  const totalNews = tabData[selectedTab].length;
  const hasMore = selectedTab === "news" && newsLimit < totalNews;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-4 xs:gap-6 sm:gap-8 py-3 xs:py-4 sm:py-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <section className="w-full mb-4 xs:mb-6 sm:mb-8">
            <div className="relative w-full h-[500px] xs:h-[550px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]">
              <Image
                src="/home.jpg"
                alt="Angkaew"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              
              {/* Desktop - Highlight Services และ Vehicle Section */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                w-full max-w-7xl px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8
                hidden xl:flex xl:flex-col xl:gap-6">
                
                {/* Highlight Services */}
                <div className="grid grid-cols-6 bg-[#6869AA]/70 backdrop-blur-md
                  rounded-xl lg:rounded-2xl xl:rounded-3xl items-center py-3 lg:py-5">
                  <h2 className="text-white col-span-1 text-center 
                    text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold
                    leading-tight max-w-[100px] lg:max-w-[140px] xl:max-w-[160px] 2xl:max-w-[180px]
                    mx-auto">
                    Highlight <br />Services
                  </h2>
                  {HighlightServices.map((service, index) => {
                    const isExternal = service.isExt === true;
                    const card = (
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="group px-1 lg:px-2"
                      >
                        <div className="flex flex-col items-center transition-all duration-300 ease-in-out 
                          hover:shadow-lg transform hover:-translate-y-1.5 
                          pb-1 lg:pb-2 relative group 
                          h-16 lg:h-20 xl:h-24 2xl:h-28 rounded-lg lg:rounded-xl xl:rounded-2xl">
                          <div className="absolute inset-0 bg-[#FAAF39] opacity-0 group-hover:opacity-100 
                            transition-all duration-300 rounded-lg lg:rounded-xl xl:rounded-2xl -mt-14" />
                          
                          <div className="w-8 h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 
                            -mt-3 lg:-mt-4 xl:-mt-6 2xl:-mt-8
                            rounded-lg lg:rounded-xl xl:rounded-2xl 
                            bg-white flex items-center justify-center shadow-md 
                            group-hover:shadow-lg transition-all duration-300 
                            group-hover:scale-105 relative z-10">
                            <div className="text-[#6869AA] transition-colors duration-300 
                              w-5 h-5 lg:w-8 lg:h-8 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 
                              flex items-center justify-center">
                              {service.icon}
                            </div>
                          </div>
                          
                          <span className="text-white 
                            text-[10px] lg:text-xs xl:text-sm 2xl:text-base 
                            font-medium text-center leading-tight 
                            transition-colors duration-300 
                            mt-1 lg:mt-2 relative z-10 px-1">
                            {service.label}
                          </span>
                        </div>
                      </motion.div>
                    );
                    return isExternal ? (
                      <a 
                        key={index} 
                        href={service.link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block"
                      >
                        {card}
                      </a>
                    ) : (
                      <Link key={index} href={service.link!}>
                        {card}
                      </Link>
                    );
                  })}
                </div>

                {/* Desktop Vehicle Section - ต่อจาก Highlight Services */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className="hidden lg:flex items-stretch gap-8 xl:gap-12">
                    {/* Text Content - ครึ่งหนึ่ง */}
                    <div className="w-1/2 flex flex-col justify-center">
                      <h2 className="text-white text-2xl xl:text-3xl 2xl:text-4xl 
                        font-bold mb-3 xl:mb-4 leading-tight">
                        {t("vehicle")}
                      </h2>
                      <p className="text-white/90 text-base xl:text-lg 2xl:text-xl 
                        leading-relaxed">
                        {t("vehicle_title")}
                      </p>
                    </div>
                    
                    {/* Vehicle Button - ครึ่งหนึ่ง */}
                    <div className="w-1/2">
                      <a
                        href={process.env.NEXT_PUBLIC_CMU_SIGNIN_BTN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full cursor-pointer"
                      >
                        <div
                          className="relative rounded-xl xl:rounded-2xl overflow-hidden shadow-lg 
                            hover:shadow-xl transition-all duration-300 hover:scale-105 
                            active:scale-95 cursor-pointer bg-cover bg-center bg-no-repeat 
                            w-full h-full group flex items-center justify-center"
                          style={{ backgroundImage: "url('/vehicle.svg')" }}
                        >
                          <div className="relative flex items-center justify-center 
                            font-bold text-white w-full h-full px-6">
                            <div className="flex items-center space-x-4 xl:space-x-5">
                              <CarFront className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 flex-shrink-0" />
                              <div className="border-l border-white h-8 xl:h-10 2xl:h-12" />
                              <span className="text-xl xl:text-2xl 2xl:text-3xl font-bold whitespace-nowrap">
                                {t("vehicle_btn")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>

        <div className="w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-4 xs:pt-6 sm:pt-8 lg:pt-10"
          >
            <section>
              <div className="w-full">
                {/* ปรับจาก xl:hidden เป็น lg:hidden */}
                <div className="block xl:hidden bg-white rounded-2xl py-6 px-5 shadow-lg border border-gray-100">
                  <div className="text-center mb-6">
                    <h2 className="text-[#6869AA] text-xl font-semibold leading-tight">
                      Highlight Services
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {HighlightServices.map((service, index) => {
                      const card = (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                          viewport={{ once: true, amount: 0.1 }}
                          className="group"
                        >
                          <div className="flex items-center p-4 rounded-xl
                            transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                            bg-[#6869AA] hover:bg-[#4D4E80] space-x-4 border border-gray-100">
                            <div className="w-12 h-12 flex items-center justify-center
                              bg-[#fff] rounded-lg shadow-sm text-white
                              group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                              <div className="text-white">{service.icon}</div>
                            </div>
                            <span className="font-medium text-sm text-[#fff] leading-relaxed flex-1">
                              {service.label}
                            </span>
                            <div className="w-5 h-5 flex items-center justify-center
                              text-[#fff] opacity-70 group-hover:opacity-100
                              group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                      );
                      return service.isExt ? (
                        <a key={`ext-${index}`} href={service.link} target="_blank" rel="noopener noreferrer" className="block">
                          {card}
                        </a>
                      ) : (
                        <Link key={`int-${index}`} href={service.link || ""} className="block">
                          {card}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                
                {/* ปรับ Vehicle Section ให้ซ่อนเมื่อจอใหญ่กว่า lg */}
                <div className="block xl:hidden pb-4 xs:pb-6 sm:pb-8 w-full pt-4 xs:pt-6 sm:pt-8">
                  <div className="flex flex-col gap-4 xs:gap-6 sm:gap-8 items-stretch">
                    <div className="w-full flex flex-col justify-center">
                      <h2 className="text-black text-lg xs:text-xl sm:text-2xl md:text-3xl 
                        font-bold mb-2 xs:mb-3 sm:mb-4 leading-tight text-center">
                        {t("vehicle")}
                      </h2>
                      <p className="text-black text-xs xs:text-sm sm:text-base 
                        leading-relaxed text-justify">
                        {t("vehicle_title")}
                      </p>
                    </div>
                    <div className="w-full h-24 xs:h-28 sm:h-32 md:h-36">
                      <a href={process.env.NEXT_PUBLIC_CMU_SIGNIN_BTN} target="_blank" rel="noopener noreferrer"
                        className="block w-full h-full cursor-pointer">
                        <div className="relative rounded-lg xs:rounded-xl sm:rounded-2xl 
                          overflow-hidden shadow-lg hover:shadow-xl 
                          transition-all duration-300 hover:scale-105 active:scale-95 
                          cursor-pointer bg-cover bg-center bg-no-repeat w-full h-full
                          group flex items-center justify-center"
                          style={{ backgroundImage: "url('/vehicle.svg')" }}>
                          <div className="relative flex items-center justify-center 
                            font-bold text-white w-full h-full px-2 xs:px-3 sm:px-4 md:px-6">
                            <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4">
                              <CarFront className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 
                                md:w-8 md:h-8 flex-shrink-0" />
                              <div className="border-l border-white h-5 xs:h-6 sm:h-7 md:h-8" />
                              <span className="text-sm xs:text-base sm:text-lg 
                                md:text-xl font-bold whitespace-nowrap">
                                {t("vehicle_btn")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <section className="py-3 xs:py-4 sm:py-6 bg-white rounded-md">
              <div className="mb-4 xs:mb-5 sm:mb-6 relative">
                <div className="absolute left-0 bottom-[2px] w-full h-[2px] bg-[#6869AA]/40 translate-y-1/2"></div>
                <div className="flex gap-6">
                  {tabs.map((text, index) => (
                    <div key={index} className="relative" onClick={() => setSelectedTab(text)}>
                      <span className={`relative text-base xs:text-lg sm:text-xl 
                        pb-3 block cursor-pointer transition-colors duration-200 ${
                        selectedTab === text ? "font-bold text-black" : "text-gray-400 hover:text-gray-600"
                      }`}>
                        {t(text)}
                      </span>
                      {selectedTab === text && (
                        <span className="absolute left-0 bottom-0 w-full h-[5px] rounded-full bg-gradient-to-r from-[#6869AA] to-[#999AFF]"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-5 sm:mb-6"
              >
                {(selectedTab === "news" || selectedTab === "documents") && loadingNews ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-5 sm:mb-6">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx} className="bg-gray-200/60 rounded-lg xs:rounded-xl 
                        h-48 xs:h-52 sm:h-56 md:h-60 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-[200px] xs:min-h-[220px] sm:min-h-[240px] mb-4 xs:mb-5 sm:mb-6">
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                      gap-3 xs:gap-4 sm:gap-6 w-full">
                      {tabData[selectedTab].length > 0 ? (
                        tabData[selectedTab]
                          .slice(0, selectedTab === "news" ? newsLimit : tabData[selectedTab].length)
                          .map((item, index) => {
                            const isExternal = /^https?:\/\//.test(item.link);
                            const cardContent = (
                              <div className="bg-white rounded-lg xs:rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                                hover:scale-105 transition-transform duration-300 ease-in-out 
                                flex flex-col h-full w-full border border-gray-100">
                                {item.imageUrl ? (
                                  <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={271}
                                    height={163}
                                    className="w-full h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-12 xs:h-14 sm:h-16 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs xs:text-sm">เอกสาร</span>
                                  </div>
                                )}
                                <div className="p-2 xs:p-3 sm:p-4 flex flex-col flex-grow">
                                  <h4 className="text-xs xs:text-sm sm:text-base 
                                    font-medium mb-1 xs:mb-2 text-black line-clamp-2 min-h-[2.5em] xs:min-h-[3em]">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-gray-600 mb-2 xs:mb-3 
                                    line-clamp-3 flex-grow min-h-[2.5rem] xs:min-h-[3rem]">
                                    {item.description.length > 120
                                      ? `${item.description.slice(0, 120)}…`
                                      : item.description}
                                  </p>
                                </div>
                              </div>
                            );

                            return isExternal ? (
                              <a key={item.link ?? index} href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                                {cardContent}
                              </a>
                            ) : (
                              <Link key={item.link ?? index} href={item.link} className={loadingNews ? "pointer-events-none" : ""} prefetch={false}>
                                {cardContent}
                              </Link>
                            );
                          })
                      ) : (
                        <div className="col-span-1 xs:col-span-2 lg:col-span-3 xl:col-span-4 
                          text-center py-6 xs:py-8 sm:py-10 text-gray-500">
                          {t("no_items")}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-end">
                {hasMore && (
                  <button
                    disabled={loadingNews}
                    onClick={() => setNewsLimit((prev) => Math.min(prev + pageSize, totalNews))}
                    className="font-bold bg-amber-400 text-gray-700 
                      px-3 xs:px-4 sm:px-6 py-1 xs:py-2 rounded-lg xs:rounded-xl 
                      text-xs xs:text-sm sm:text-base 
                      hover:bg-amber-300 hover:scale-105 
                      transition-transform duration-300 ease-in-out 
                      disabled:opacity-50 disabled:hover:scale-100">
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