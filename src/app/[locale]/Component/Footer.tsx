"use client";

import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";

// Footer component
const Footer: React.FC = () => {
  const t = useTranslations("Footer");

  return (
    <motion.div
      // Animation settings for the footer container
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <footer className="shadow-xl bg-[#6869AA] text-white py-8 mt-auto rounded-md font-[Prompt] max-w-7xl mx-auto text-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-around">
          {/* Contact information section */}
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-10">
            <h1 className="font-bold mb-4">{t("contact_us")}</h1>
            <p>{t("map1")}</p>
            <p>{t("map2")}</p>
            <p>{t("admin")}</p>
            <p>{t("vehicle_reg")}</p>
            <p>{t("elect_shutt")}</p>
            <p>{t("van_bus")}</p>
            <p>{t("sec_off")}</p>
            <p>{t("off_hour")}</p>
            <p>SCMC : Smart Campus Management Center</p>
            <p>{t("cmut")} (@korsormorchor)</p>
            <br/>
            <p>{t("dev_by")} Punnawich</p>
          </div>
          {/* Google Map Section */}
          <div className="flex justify-center sm:justify-end sm:me-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888.4392456677072!2d98.95485265947839!3d18.803567659926504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b3530c3a9a5%3A0x62ddacc2ae6b2597!2z4Lio4Li54LiZ4Lii4LmM4Lia4Lij4Li04Lir4Liy4Lij4LiI4Lix4LiU4LiB4Liy4Lij4LmA4Lih4Li34Lit4LiH4Lit4Lix4LiI4LiJ4Lij4Li04Lii4LiwIOC4oeC4ii4!5e0!3m2!1sth!2sth!4v1744098137385!5m2!1sth!2sth"
              width="300"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md lg:hidden"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888.4392456677072!2d98.95485265947839!3d18.803567659926504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b3530c3a9a5%3A0x62ddacc2ae6b2597!2z4Lio4Li54LiZ4Lii4LmM4Lia4Lij4Li04Lir4Liy4Lij4LiI4Lix4LiU4LiB4Liy4Lij4LmA4Lih4Li34Lit4LiH4Lit4Lix4LiI4LiJ4Lij4Li04Lii4LiwIOC4oeC4ii4!5e0!3m2!1sth!2sth!4v1744098137385!5m2!1sth!2sth"
              width="500"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="hidden lg:block rounded-md"
            />
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
