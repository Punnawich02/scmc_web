"use client";

import Header from "../../../Component/Header";
import Footer from "../../../Component/Footer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const CCTVPage: React.FC = () => {
  const t = useTranslations("SecurityPage");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title={t("page_title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto font-[Prompt]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
            {t("header")}
          </h1>
          <p className="text-gray-700 mb-4">{t("title")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="h-full"
        >
          <button className="bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
            สำหรับบุคลากร / นักศึกษา ในมช
          </button>
          <button className="mt-4 bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
            สำหรับบุคคลภายนอก
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CCTVPage;
