"use client";

import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Cctv, FileText, Waves, Building, Map } from "lucide-react";

const HighlightServices = [
  {
    icon: <Map className="w-16 h-16" color="#6869AA" />,
    label: "ตารางและแผนที่รถไฟฟ้า",
  },
  {
    icon: <Cctv className="w-16 h-16" color="#6869AA" />,
    label: "ขอดูกล้องวงจรปิด",
  },
  {
    icon: <FileText className="w-16 h-16" color="#6869AA" />,
    label: "บริการข้อมูล",
  },
  {
    icon: <Waves className="w-16 h-16" color="#6869AA" />,
    label: "สาธารณูปโภค",
  },
  {
    icon: <Building className="w-16 h-16" color="#6869AA" />,
    label: "ขอใช้สถานที่",
  },
];

const NewsData = [
  {
    title: "กิจกรรมพิเศษสำหรับนักศึกษา CMU ปี 1-4",
    description:
      "กิจกรรมพิเศษสำหรับนักศึกษา มช. ประจำปีการศึกษา 2025 เพื่อส่งเสริมการเรียนรู้และพัฒนาทักษะนอกห้องเรียน",
    imageUrl: "/news_1.png",
  },
  {
    title: "ข่าวประชาสัมพันธ์จากหน่วยงานต่างๆ",
    description:
      "ข่าวประชาสัมพันธ์จากหน่วยงานต่างๆ ของมหาวิทยาลัยเชียงใหม่",
    imageUrl: "/news_2.png",
  },
  {
    title: "ประกาศจากหน่วยงานรักษาความปลอดภัย",
    description:
      "ประกาศจากหน่วยงานรักษาความปลอดภัยเกี่ยวกับการเข้า-ออก มช.",
    imageUrl: "/news_3.png",
  },
  {
    title: "ข่าวสารการจราจรในเขต มช.",
    description:
      "ข่าวสารการจราจรในเขต มช. เพื่อความสะดวกในการเดินทาง",
    imageUrl: "/news_4.png",
  },
];

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header title="หน้าหลัก" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        <div className="max-w-[80%] mx-auto">
          {/* Hero Section */}
          <section className="relative w-full max-w-7xl mx-auto">
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src="/DSC06224.jpg"
                alt="Angkaew"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-transparent flex flex-col justify-center px-6 sm:px-8">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  ลงทะเบียนสิทธิ์เข้า-ออก มช.
                </h2>
                <p className="text-white text-sm sm:text-base max-w-md mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  nesciunt fugiat tempore in consequatur error quas ab, vitae
                  fugit earum.
                </p>
                <a href="#">
                  <button className="bg-[#6869AA] text-white px-4 py-2 rounded-md text-sm sm:text-base w-max hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                    เข้าสู่ระบบลงทะเบียนยานพาหนะ
                  </button>
                </a>
              </div>
            </div>
          </section>

            {/* Highlight Section */}
            <section className="pb-6">
            <div className="relative mx-auto mt-10">
              <div className="bg-[#FAAF39D1] rounded-md py-6 px-6 shadow-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center text-purple-800 text-sm font-medium">
              {HighlightServices.map((service, index) => (
                <div
                key={index}
                className="flex flex-col items-center relative hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-white flex items-center justify-center">
                  {service.icon}
                </div>
                <span className="text-white pt-2 text-xs sm:text-sm">
                  {service.label}
                </span>
                </div>
              ))}
              </div>

              <div className="absolute -top-4 left-0 bg-white text-yellow-700 px-4 py-2 rounded-tr-xl rounded-bl-md shadow text-xs sm:text-sm font-semibold">
              Highlight
              <br />
              Services
              </div>
            </div>
            </section>

          {/* News Section */}
          <section className="px-6 py-4 bg-gray-50 rounded-md shadow-md">
            <div className="mb-6">
              <span className="text-lg font-medium border-b-2 border-indigo-600 inline-block pb-1 hover:cursor-pointer">
                ข่าวกิจกรรม
              </span>
              <span className="text-gray-400 text-sm ml-4 hover:cursor-pointer">
                เอกสารเผยแพร่
              </span>
              <span className="text-gray-400 text-sm ml-4 hover:cursor-pointer">
                บทความ
              </span>
            </div>
            
            {/* News Data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {NewsData.map((news, index) => (
              <div
                key={index}
                className="bg-white rounded-md overflow-hidden shadow-sm hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Image
                src={news.imageUrl}
                alt={news.title}
                width={271}
                height={163}
                className="w-full h-40 object-cover"
                />
                <div className="p-3">
                <h4 className="text-sm font-medium mb-1">{news.title}</h4>
                <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                  {news.description}
                </p>
                <a href="#" className="text-indigo-600 text-xs">
                  อ่านเพิ่มเติม
                </a>
                </div>
              </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button className="bg-amber-400 text-gray-700 px-4 py-1 rounded text-sm hover:cursor-pointer hover:bg-amber-300 hover:scale-105 transition-transform duration-300 ease-in-out">
                เพิ่มเติม +
              </button>
            </div>
          </section>

          {/* Mobile App Promo */}
          <section className="px-6 py-8 bg-white flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="/smartphone.png"
                width={400}
                height={400}
                alt="Smartphone"
                className="h-48 object-contain"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <Image
                src="/cmu_mobile.svg"
                width={400}
                height={150}
                alt="CMU Mobile Map"
                className="w-full object-contain rounded-md hover:shadow-lg hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
