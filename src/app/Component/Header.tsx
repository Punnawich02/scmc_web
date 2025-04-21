"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

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
  const pathname = "/" + usePathname().split("/")[1];
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <head>
        <title>{title}</title>
      </head>
      <header
        className="bg-transparent lg:border-b-1 shadow-md lg:shadow-none bg-white border-[#6869AA] px-6 w-full mx-auto flex flex-wrap justify-between items-center max-w-[1280px] h-[80px]"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div className="flex justify-between items-center w-full lg:w-auto">
          <div>
            {/* Logo for larger screens */}
            <a href="/home" className="hidden sm:flex items-center">
              <Image
                src="/scmc_logo.svg"
                alt="scmc logo"
                width={131}
                height={44}
              />
            </a>
            {/* Logo for smaller screens */}
            <a href="/home" className="flex items-center sm:hidden">
              <Image
                src="/scmc_logo.svg"
                alt="scmc logo"
                width={100}
                height={44}
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-500 focus:outline-none hover:cursor-pointer"
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <Menu className="w-10 h-10" color="#6869AA" />
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
                className="fixed top-0 right-0 h-full sm:w-1/3 w-1/2 bg-white shadow-lg z-50 p-6 lg:hidden"
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
                      className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === link.href ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                    >
                      {link.name}
                    </a>
                  ))}

                  {/* Language Switcher */}
                  <div className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 mt-6">
                    <Image
                      src="/usa.svg"
                      alt="USA flag"
                      width={18}
                      height={18}
                    />
                    <span
                      id="language-text"
                      className="text-sm text-[#6869AA] font-[Prompt] font-[16px] font-[400]"
                    >
                      English
                    </span>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-6 ml-2">
            {header_links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`text-sm hover:bg-gray-100
                ${pathname === link.href ? "font-bold" : ""}
                text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Language Switcher */}
        <div>
          <button className="hidden lg:flex items-center space-x-2 mr-2 hover:cursor-pointer hover:bg-gray-100">
            <Image
              src="/usa.svg"
              width={20}
              height={20}
              alt="Smartphone"
              className="h-5 object-contain"
            />
            <span className="text-sm text-[#6869AA] font-[Prompt] font-[400]">
              English
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
