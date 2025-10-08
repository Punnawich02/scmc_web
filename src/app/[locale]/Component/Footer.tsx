"use client";

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
      <footer className="shadow-xl bg-[#6869AA] text-white py-8 mt-auto font-[Prompt] mx-auto text-center justify-center xl:rounded-tl-xl xl:rounded-tr-xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start mx-auto max-w-7xl">
          {/* Contact information section */}
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-8">
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
          <div className="flex flex-col items-center text-center pr-0 lg:items-end lg:text-right lg:pr-8">
            <Link href={`/${locale}/home/contact_us`} className="block">
              <Image
                src={
                  locale === "th"
                    ? "/footer/contact_us_th.svg"
                    : "/footer/contact_us_en.svg"
                }
                alt="contact_us"
                width={250}
                height={100}
                className="h-auto hover:scale-105 transition-transform"
              />
            </Link>

            <a
              href="https://voc.cmu.ac.th/Choose.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3"
            >
              <Image
                src={
                  locale === "th"
                    ? "/footer/voc_th.svg"
                    : "/footer/voc_en.svg"
                }
                alt="voc"
                width={250}
                height={100}
                className="h-auto hover:scale-105 transition-transform"
              />
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
