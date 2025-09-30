"use client";

import { motion } from "framer-motion";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/dist/client/link";

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
      <footer className="shadow-xl bg-[#6869AA] text-white py-8 mt-auto font-[Prompt] mx-auto text-center justify-center xl:rounded-tl-xl xl:rounded-tr-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-around">
          {/* Contact information section */}
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-10">
            <h1 className="font-bold mb-4">
              ศูนย์บริหารจัดการเมืองเพื่อความยั่งยืน
            </h1>
            <p>อาคารสำนักงานมหาวิทยาลัย 3 ชั้น 2</p>
            <p>239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200</p>
            <p>เวลาทำการ : จันทร์ - ศุกร์ 08:30 น. - 16:30 น.</p>
            <p>support@scmc.cmu.ac.th</p>
            <p className="hidden">
              {t("dev_by")} Punnawich, Pichapa, Borwonpak, Natanan
            </p>
          </div>
          <div className="text-center sm:text-left text-xs sm:text-sm sm:ms-10">
            <h1 className="font-bold mb-4">Follow us</h1>
            <a
              href="https://www.facebook.com/scmccmu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>SCMC : Sustainable Campus Management Center</p>
            </a>
            <a
              href="https://www.facebook.com/korsormorchor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>ขส.มช. (@korsormorchor)</p>
            </a>
          </div>
          <div>
            <Link href="/contact_us">
              <Image
                src="/footer/contact_us.svg"
                alt="contact_us"
                width={200}
                height={100}
                className="mx-auto hover:scale-105 transition-transform"
              />
            </Link>
            <a
              href="https://voc.cmu.ac.th/Choose.aspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/footer/voc.svg"
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
