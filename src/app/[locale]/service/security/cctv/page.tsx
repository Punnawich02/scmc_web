"use client";

import Header from "../../../Component/Header";
import Footer from "../../../Component/Footer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

<<<<<<< HEAD

=======
>>>>>>> Mai's-Branch
const CCTVPage: React.FC = () => {
  const t = useTranslations("CCTVPage");
  const router = useRouter();
  const locale = useLocale();

<<<<<<< HEAD
 const checkToken = async () => {
  try {
    const res = await fetch('/api/getToken', { credentials: 'include' });
=======
  const checkToken = async () => {
    try {
      const res = await fetch("/api/getToken", { credentials: "include" });
      if (res.ok) {
        router.push(`/${locale}/service/security/cctv/form`);
>>>>>>> Mai's-Branch

    if (res.ok) {
      router.push(`/${locale}/service/security/cctv/inside?type=internal`);
    } else {
      const callbackUrl = `/${locale}/service/security/cctv/inside?type=internal`;
      window.location.href = `/api/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    }
  } catch (err) {
    console.error('Token check failed', err);
    window.location.href = `/api/login?callbackUrl=${encodeURIComponent(`/${locale}/home`)}`;
  }
};

 
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
          <button
            className="bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out"
<<<<<<< HEAD
            onClick={checkToken}
          >
            สำหรับบุคลากร / นักศึกษาในมช
          </button>

          <button 
            id="สำหรับบุคคลภายนอก"
            className="mt-4 bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out"
            onClick={() => router.push(`/${locale}/service/security/cctv/inside?type=external`)}
=======
            onClick= {checkToken}
            >
            {t("Insider")}
            </button>
          <button 
          className="mt-4 bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out"
          onClick={() => router.push(`/${locale}/service/security/cctv/form`)}
>>>>>>> Mai's-Branch
          >
            {t("Outsider")}
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CCTVPage;
