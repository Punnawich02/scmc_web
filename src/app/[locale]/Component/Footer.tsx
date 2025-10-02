"use client";

import { motion } from "framer-motion";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/dist/client/link";
import { Clock, Facebook, Mail } from "lucide-react";

// Footer component
const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <motion.div
      // Animation settings for the footer container
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <footer className="shadow-xl bg-[#6869AA] text-white py-8 mt-auto font-[Prompt] mx-auto text-center justify-center xl:rounded-tl-xl xl:rounded-tr-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start max-w-7xl mx-auto">
          {/* Contact information section */}
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-10">
            <h1 className="font-bold mb-2">{t("topic")}</h1>
            <p>{t("map1")}</p>
            <p>{t("map2")}</p>
            <div className="flex items-center justify-center sm:justify-start mt-4">
              <Clock className="inline w-4 h-4 me-2 mb-1" />
              <p>{t("office_hour")}</p>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Mail className="inline w-4 h-4 me-2 mb-1" />
              <p>{t("email")}</p>
            </div>
            <p className="hidden">
              {t("dev_by")} Punnawich, Pichapa, Borwonpak, Natanan
            </p>
          </div>
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-10">
            <h1 className="font-bold mb-2">Follow us</h1>
            <a
              href={process.env.NEXT_PUBLIC_CMU_SCMC_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start mb-2"
            >
              <Facebook className="inline w-4 h-4 me-2 mb-1" />
              <p>SCMC : Sustainable Campus Management Center</p>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_CMU_KORSOR_FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start"
            >
              <Facebook className="inline w-4 h-4 me-2 mb-1" />
              <p>ขส.มช. (@korsormorchor)</p>
            </a>
          </div>
          <div>
            <Link href={`/${locale}/home/contact_us`}>
                <Image
                  src= {locale === "th" ? "/footer/contact_us_th.svg" : "/footer/contact_us_en.svg"}
                  alt="contact_us"
                  width={200}
                  height={100}
                  className="mx-auto hover:scale-105 transition-transform"
                />
            </Link>
            <a
              href={"https://voc.cmu.ac.th/Choose.aspx"}
              target="_blank"
              rel="noopener noreferrer"
            >
                <Image
                  src={locale === "th" ? "/footer/voc_th.svg" : "/footer/voc_en.svg"}
                  alt="voc"
                  width={200}
                  height={100}
                  className="mx-auto hover:scale-105 transition-transform mt-3"
                />
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
