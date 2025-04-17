"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
}

const header_links = [
  { name: "หน้าแรก", href: "/home" },
  { name: "บริการของเรา", href: "/service" },
  { name: "ข้อมูลกายภาพ", href: "/physical" },
  { name: "เกี่ยวกับเรา", href: "/about" },
  { name: "ร่วมสร้างความยั่งยืน", href: "/support" },
];

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <header
      className="bg-white shadow-sm py-4 px-6 w-full md:w-4/5 mx-auto flex flex-wrap md:flex-nowrap justify-between items-center rounded-md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <head>
        <title>{title}</title>
      </head>
      <div className="flex justify-between items-center w-full md:w-auto">
        <a href="/home" className="flex items-center">
          <Image src="/scmc_logo.svg" alt="scmc logo" width={131} height={44} />
        </a>
        <button
          className="md:hidden text-gray-500 focus:outline-none hover:cursor-pointer"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <Menu className="w-10 h-10" color="#6869AA" />
        </button>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 p-6"
            >
              <button
                className="text-gray-500 focus:outline-none mb-6 hover:cursor-pointer hover:text-red-500"
                aria-label="Close navigation"
                onClick={toggleNav}
              >
                Close
              </button>
              <nav className="flex flex-col space-y-4">
                {header_links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm hover:bg-gray-100 hover:cursor-pointer"
                    style={{
                      color: "#6869AA",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 mt-6">
                  <Image src="/usa.svg" alt="USA flag" width={18} height={18} />
                  <span
                    id="language-text"
                    className="text-sm"
                    style={{
                      color: "#6869AA",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    English
                  </span>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
