"use client";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import React from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useTranslations } from "next-intl";

const ContactPage: React.FC = () => {
  const t = useTranslations("ContactUsPage");

  const contactData = [
    {
      title: t("admin"),
      content: "0-5394-1495",
    },
    {
      title: t("hr"),
      content: "0-5394-0152",
    },
    {
      title: t("vehicle"),
      content: "0-5394-1494",
    },
    {
      title: t("campus_shuttle"),
      content: "0-5394-4936",
    },
    {
      title: t("vans"),
      content: "0-5394-4949",
    },
    {
      title: t("security"),
      content: "0-5394-1190-1",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
      <Header title={t("page_title")} />
      <main className="flex-1 flex flex-col justify-center px-4 py-8 md:py-12">
        <div className="w-full mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* กล่องหัวเรื่อง */}
            <div className="relative rounded-2xl p-6 shadow-lg bg-[url('/home.jpg')] bg-cover bg-center h-32">
              <div className="absolute inset-0 bg-[#111243]/60 rounded-2xl" />
              <div className="relative flex h-full items-center justify-start">
                <div className="flex items-center gap-4">
                  <div className="bg-[#5759BB] rounded-full p-4 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-white font-extrabold text-2xl md:text-3xl leading-snug">
                    {t("header")}
                  </h1>
                </div>
              </div>
            </div>

            {/* รายการข้อมูลติดต่อ */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="space-y-3">
                {contactData.map(({ title, content }, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-2 h-2 bg-[#5759BB] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-gray-700 font-medium">
                          {title}:
                        </span>
                        <span className="text-[#5759BB] font-semibold">
                          {content}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
