"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const pathname = "/" + usePathname().split("/")[2];
  const lang = usePathname().split("/")[1];
  const icon_src = lang === "en" ? "/th.svg" : "/usa.svg";
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const t = useTranslations("Header");

  const currentPath = usePathname()  // renamed from pathname
  const router = useRouter()
  
  const switchLocale = (locale: 'en' | 'th') => {
    const pathSegments = currentPath.split('/')
    pathSegments[1] = locale // change only the locale segment
    const newPath = pathSegments.join('/')

    router.push(newPath)
  }

  return (
    <>
      <title>{title}</title>
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
            <Link href="/home" className="hidden sm:flex items-center">
              <Image
                src="/scmc_logo.svg"
                alt="scmc logo"
                width={131}
                height={44}
              />
            </Link>
            {/* Logo for smaller screens */}
            <Link href="/home" className="flex items-center sm:hidden">
              <Image
                src="/scmc_logo.svg"
                alt="scmc logo"
                width={100}
                height={44}
              />
            </Link>
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
                  <Link
                    href="/home"
                    className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/home" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                  >
                    {t("home")}
                  </Link>
                  <Link
                    href="/service"
                    className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/service" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                  >
                    {t("service")}
                  </Link>
                  <Link
                    href="/physical"
                    className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/physical" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                  >
                    {t("physical")}
                  </Link>
                  <Link
                    href="/about"
                    className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/about" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/support"
                    className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/support" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                  >
                    {t("support")}
                  </Link>

                  {/* Language Switcher */}
                  <div className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 mt-6">
                    <button onClick={() => switchLocale('th')}>
                    <Image
                      src={icon_src}
                      alt="USA flag"
                      width={18}
                      height={18}
                    />
                    <span
                      id="language-text"
                      className="text-sm text-[#6869AA] font-[Prompt] font-[16px] font-[400]"
                    >
                      {t("lang")}
                    </span>
                    </button>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-6 ml-2">
            <Link
              href="/home"
              className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/home" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
            >
              {t("home")}
            </Link>
            <Link
              href="/service"
              className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/service" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
            >
              {t("service")}
            </Link>
            <Link
              href="/physical"
              className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/physical" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
            >
              {t("physical")}
            </Link>
            <Link
              href="/about"
              className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/about" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
            >
              {t("about")}
            </Link>
            <Link
              href="/support"
              className={`text-sm hover:bg-gray-100 hover:cursor-pointer 
                      ${pathname === "/support" ? "font-bold" : ""}
                      text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
            >
              {t("support")}
            </Link>
          </nav>
        </div>

        {/* Desktop Language Switcher */}
        <div>
          <button className="hidden lg:flex items-center space-x-2 mr-2 hover:cursor-pointer hover:bg-gray-100">
            <Image
              src={icon_src}
              width={20}
              height={20}
              alt="Smartphone"
              className="h-5 object-contain"
            />
            <span className="text-sm text-[#6869AA] font-[Prompt] font-[400]">
              {t("lang")}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
