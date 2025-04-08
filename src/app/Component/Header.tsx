import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 w-full flex justify-between items-center">
      <div>
        <Image src="/scmc_logo.svg" alt="scmc logo" width={131} height={44} />
      </div>
      <div>
        <nav className="space-x-6">
            <a
            href="#"
            className="text-sm hover:bg-gray-100"
            style={{
              color: "#6869AA",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
            >
            หน้าแรก
            </a>
          <a
            href="#"
            className="text-sm hover:bg-gray-100"
            style={{
              color: "#6869AA",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            บริการของเรา
          </a>
          <a
            href="#"
            className="text-sm hover:bg-gray-100"
            style={{
              color: "#6869AA",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            ข้อมูลกายภาพ
          </a>
          <a
            href="#"
            className="text-sm hover:bg-gray-100"
            style={{
              color: "#6869AA",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            เกี่ยวกับเรา
          </a>
          <a
            href="#"
            className="text-sm hover:bg-gray-100"
            style={{
              color: "#6869AA",
              fontFamily: "Inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            ร่วมสร้างความยั่งยืน
          </a>
        </nav>
      </div>
      <div>
        <span
          className="text-sm hover:bg-gray-100"
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
    </header>
  );
};

export default Header;
