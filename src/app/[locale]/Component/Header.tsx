"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const currentPath = usePathname();
  const pathname = "/" + currentPath.split("/")[2];
  const lang = currentPath.split("/")[1];
  const router = useRouter();
  const t = useTranslations("Header");

  // Select Flag Icon
  const icon_src = lang === "en" ? "/th.svg" : "/usa.svg";

  // Select Show Language
  const targetLang = lang === "en" ? "ไทย" : "English";

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  // Language Switcher Function
  const switchLocale = () => {
    const targetLocale = lang === "en" ? "th" : "en";
    const pathSegments = currentPath.split("/");
    pathSegments[1] = targetLocale;
    const newPath = pathSegments.join("/");
    router.push(newPath);
  };

  const nav_bar = [
    {
      show: t("home"),
      link: "/home",
    },
    {
      show: t("service"),
      link: "/service",
    },
    {
      show: t("physical"),
      link: "/physical",
    },
    {
      show: t("about"),
      link: "/about",
    },
    {
      show: t("support"),
      link: "/support",
    },
  ];

  // Find active index
  const activeIndex = nav_bar.findIndex((item) => pathname === item.link);

  // Update indicator position
  const updateIndicator = (index: number) => {
    const button = buttonRefs.current[index];
    if (button) {
      const container = button.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
        });
      }
    }
  };

  useEffect(() => {
    // Initialize indicator position with delay to ensure DOM is ready
    if (activeIndex >= 0) {
      const timer = setTimeout(() => {
        updateIndicator(activeIndex);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  useEffect(() => {
    // Update indicator on window resize
    const handleResize = () => {
      const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex;
      if (targetIndex >= 0) {
        updateIndicator(targetIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, hoverIndex]);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
    updateIndicator(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    if (activeIndex >= 0) {
      updateIndicator(activeIndex);
    }
  };

  return (
    <>
      <title>{title}</title>
      <header
        className="bg-transparent shadow-md lg:shadow-none bg-white px-6 w-full mx-auto flex flex-wrap justify-between items-center max-w-[1280px] h-[80px] rounded-2xl"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottom: "6px solid",
          borderImage: "linear-gradient(90deg, #8586D1, #FAAF39, #8FD95E) 1",
        }}
      >
        <div className="flex justify-between items-center w-full lg:w-auto">
          <div>
            {/* Logo for larger screens */}
            <Link
              href={`/${lang}/home`}
              className="hidden sm:flex items-center"
            >
              <Image
                src="/scmc_logo.svg"
                alt="scmc logo"
                width={131}
                height={44}
              />
            </Link>

            {/* Logo for smaller screens */}
            <Link
              href={`/${lang}/home`}
              className="flex items-center sm:hidden"
            >
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
                className="fixed top-0 right-0 h-full sm:w-1/3 w-1/2 bg-white shadow-lg z-50 p-6 lg:hidden rounded-l-2xl"
              >
                <button
                  className="text-gray-500 focus:outline-none mb-6 hover:cursor-pointer hover:text-red-500"
                  aria-label="Close navigation"
                  onClick={toggleNav}
                >
                  Close
                </button>

                <nav className="flex flex-col space-y-4">
                  {nav_bar.map((item, index) => (
                    <Link
                      key={index}
                      href={`/${lang}${item.link}`}
                      className={`text-sm hover:bg-gray-100 hover:cursor-pointer rounded-xl p-2
                        ${pathname === item.link ? "font-bold" : ""}
                        text-[#6869AA] font-[Prompt] font-[16px] font-[400]`}
                    >
                      {item.show}
                    </Link>
                  ))}

                  {/* Language Switcher - Mobile */}
                  <button
                    onClick={switchLocale}
                    className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-100 mt-6 rounded-xl p-2"
                  >
                    <div className="flex items-center space-x-2 hover:cursor-pointer">
                      <Image
                        src={icon_src}
                        alt="Language flag"
                        width={18}
                        height={18}
                      />
                      <span
                        id="language-text"
                        className="text-sm text-[#6869AA] font-[Prompt] font-[16px] font-[400] ml-2"
                      >
                        {targetLang}
                      </span>
                    </div>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation with Sliding Indicator */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="relative flex space-x-6 ml-2 bg-gray-50 rounded-lg p-2">
            {nav_bar.map((item, index) => (
              <Link
                key={index}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                href={`/${lang}${item.link}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`relative px-4 py-2 rounded-md font-medium transition-colors duration-200 z-10
                  ${
                    pathname === item.link
                      ? "text-[#6869AA] font-bold"
                      : "text-gray-600 "
                  } font-[Prompt] text-[18px]`}
              >
                {item.show}
              </Link>
            ))}

            {/* Sliding indicator - Bottom bar */}
            {activeIndex >= 0 && (
              <div
                className="absolute h-[7px] transition-all duration-300 ease-out rounded-full z-20"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  backgroundColor: "#6869AA",
                  bottom: "-14px", // เลื่อนลงไปทับกับ gradient border
                  transform: "translateY(0px)",
                }}
              />
            )}

            {/* Background highlight for active/hovered button */}
            {activeIndex >= 0 && (
              <div
                className="absolute top-2 bottom-2 rounded-md transition-all duration-300 ease-out z-0"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  backgroundColor: "#6869AA",
                  opacity: 0.08,
                }}
              />
            )}
          </nav>
        </div>

        {/* Desktop Language Switcher */}
        <div>
          <button
            onClick={switchLocale}
            className="hidden lg:flex items-center space-x-2 mr-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-xl"
          >
            <Image
              src={icon_src}
              width={20}
              height={20}
              alt="Language flag"
              className="h-5 object-contain"
            />
            <span className="text-sm text-[#6869AA] font-[Prompt] font-[400] ml-1">
              {targetLang}
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
