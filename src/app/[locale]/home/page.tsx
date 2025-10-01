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
type TabType = "news" | "documents";

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */
export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  /* --------------------------- state: news / tab --------------------------- */
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [publicDocItems, setPublicDocItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [, setErrorNews] = useState<string | null>(null);
  const [newsLimit, setNewsLimit] = useState(4);
  const pageSize = 4;
  const [selectedTab, setSelectedTab] = useState<TabType>("news");
  const tabs: TabType[] = ["news", "documents"];

  /* --------------------------- fetch data on mount ------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoadingNews(true); // 👉 start loading (prevents page jump)
      try {
        // Fetch news
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

        // Then update the document mapping code:

        // Fetch public documents
        const docRes = await fetch("/api/public_doc");
        if (!docRes.ok) throw new Error("Failed to fetch public documents");
        const docApi = await docRes.json();

        // Define the type for public document items
        type PublicDocItem = {
          id: number;
          titleTh: string;
          titleEn: string;
          descriptionTh: string;
          descriptionEn: string;
          linkUrl: string;
          publishedAt: string;
          isActive: boolean;
        };

        // Map public document data without images
        const mappedDocs: NewsItem[] = docApi.map((doc: PublicDocItem) => ({
          title: isThai ? doc.titleTh : doc.titleEn,
          description: isThai ? doc.descriptionTh : doc.descriptionEn,
          imageUrl: "", // Empty string to indicate no image
          link: doc.linkUrl || "#",
        }));

        setPublicDocItems(mappedDocs);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorNews(err.message);
        else setErrorNews("An unknown error occurred");
      } finally {
        setLoadingNews(false); // 👉 stop loading
      }
    };

    fetchData();
  }, [locale]); // 💡 re‑fetch when language changes

  /* ------------------------- group data by tab ----------------------------- */
  const tabData: Record<TabType, NewsItem[]> = {
    news: newsItems,
    documents: publicDocItems,
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
      link: `/${locale}/service/transit`,
      label: t("map"),
      isExt: false,
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
      isExt: true,
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
      isExt: false,
    },
    {
      icon: (
        <HousePlug
          className="w-12 h-12 md:w-16 md:h-16"
          color="#6869AA"
          strokeWidth={2}
        />
      ),
      link: `/${locale}/service/utilities`,
      label: t("util"),
      isExt: false,
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
      isExt: true,
    },
  ];

  const totalNews = tabData[selectedTab].length;
  const hasMore = selectedTab === "news" && newsLimit < totalNews;

  /* ------------------------------------------------------------------------ */
  /*                                 JSX                                       */
  /* ------------------------------------------------------------------------ */
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8  py-6 w-full">
        <div className="w-full mx-auto px-4">
          {/* Background */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="w-full  mb-6">
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
                  className=""
                  priority
                />
                {/* Desktop Version */}
                <div className="absolute bottom-0 left-0 right-0 mx-4 sm:mx-8 lg:mx-16 xl:mx-20 hidden sm:grid grid-cols-7 bg-[#6869AA]/70 backdrop-blur-lg rounded-3xl items-center translate-y-12">
                  <h2 className="text-white col-span-2 text-center text-lg sm:text-xl lg:text-2xl font-semibold">
                    Highlight <br></br>
                    Services
                  </h2>
                  {HighlightServices.map((service, index) => {
                    const isExternal = service.isExt === true;
                    const card = (
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="group"
                      >
                        <div className="flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-2 pb-4 relative group h-24 sm:h-28 lg:h-32">
                          {/* Yellow background block - แสดงตอน hover */}
                          <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl -mt-8 sm:-mt-10 lg:-mt-16 pt-8 sm:pt-10 lg:pt-16"></div>
                          {/* Icon Container */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 -mt-8 sm:-mt-10 lg:-mt-12 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative z-10">
                            <div className="text-[#6869AA] text-xl sm:text-2xl lg:text-3xl transition-colors duration-300">
                              {service.icon}
                            </div>
                          </div>
                          {/* Label */}
                          <span className="text-white text-xs sm:text-sm lg:text-base font-medium text-center leading-tight transition-colors duration-300 mt-2 relative z-10">
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
              </div>
            </section>
          </motion.div>

          {/* Highlight Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="pb-6 max-w-7xl mx-auto">
              {/* ครอบด้วย max-w-6xl + mx-auto ให้เหมือน vehicle section */}
              <div className="relative w-full max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                {/* mobile Version */}
                <div className="block sm:hidden bg-[#6869AA] rounded-xl sm:rounded-2xl lg:rounded-3xl py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
                  {/* Header */}
                  <div className="text-left sm:text-center mb-6 sm:mb-8 lg:mb-10">
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
                      Highlight Services
                    </h2>
                  </div>
                  {/* Mobile Layout - Vertical List */}
                  <div className="block space-y-3 ">
                    {HighlightServices.map((service, index) => {
                      const card = (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          className="group pt-3"
                        >
                          <div className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white">
                            {/* Icon */}
                            <div
                              className={`w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-md hover:shadow-lg ${
                                index === 0 ? "text-white" : "text-[#6869AA]"
                              }`}
                            >
                              {service.icon}
                            </div>
                            {/* Label */}
                            <span className="font-medium text-base text-[#6869AA]">
                              {service.label}
                            </span>
                          </div>
                        </motion.div>
                      );

                      return service.isExt ? (
                        <a
                          key={`ext-${index}`}
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {card}
                        </a>
                      ) : (
                        <Link key={`int-${index}`} href={service.link || ""}>
                          {card}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Vehicle Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-10 px-4 xs:px-5 sm:px-8 md:px-10"
          >
            {/* ให้ section ตรงกลาง + จำกัดความกว้างไม่เกิน 7xl */}
            <div className="max-w-7xl mx-auto pb-6 w-full">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div className="w-full order-1 lg:order-1">
                  <h2 className="text-black text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight text-center lg:text-left">
                    {t("vehicle")}
                  </h2>
                  <p className="text-black text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-justify lg:text-left">
                    {t("vehicle_title")}
                  </p>
                </div>
                
                {/* Button/Image */}
                <div className="w-full order-2 lg:order-2">
                  <a
                    href="https://scmc.cmu.ac.th/login_option"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full hover:cursor-pointer"
                  >
                    <div
                      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                      transition-all duration-300 hover:scale-105 active:scale-95 hover:cursor-pointer
                      bg-cover bg-center bg-no-repeat w-full
                      h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44"
                      style={{ backgroundImage: "url('/vehicle.svg')" }}
                    >
                      <button className="relative flex items-center justify-center font-bold text-white w-full h-full px-4 sm:px-6">
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                          <CarFront className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex-shrink-0" />
                          <div className="border-l border-white h-4 xs:h-5 sm:h-6 md:h-7 lg:h-8"></div>
                          <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold whitespace-nowrap">
                            {t("vehicle_btn")}
                          </span>
                        </div>
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
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
                    className={`text-xl ml-4 pb-1 inline-block hover:cursor-pointer ${
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
                {(selectedTab === "news" || selectedTab === "documents") &&
                loadingNews ? (
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
                      {/* Show either all items or limited news items based on tab */}
                      {tabData[selectedTab].length > 0 ? (
                        tabData[selectedTab]
                          .slice(
                            0,
                            selectedTab === "news"
                              ? newsLimit
                              : tabData[selectedTab].length
                          )
                          .map((item, index) => {
                            const isExternal = /^https?:\/\//.test(item.link);
                            const cardContent = (
                              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col h-full w-full">
                                {item.imageUrl ? (
                                  <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={271}
                                    height={163}
                                    className="w-full h-40 object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-16 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">
                                      เอกสาร
                                    </span>
                                  </div>
                                )}
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
                            );

                            return isExternal ? (
                              <a
                                key={item.link ?? index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                {cardContent}
                              </a>
                            ) : (
                              <Link
                                key={item.link ?? index}
                                href={item.link}
                                className={
                                  loadingNews ? "pointer-events-none" : ""
                                }
                                prefetch={false}
                              >
                                {cardContent}
                              </Link>
                            );
                          })
                      ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-10 text-gray-500">
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
