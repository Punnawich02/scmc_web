"use client";

import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { motion } from "framer-motion";
import { Cctv, FileText, Waves, Building, Map } from "lucide-react";

const HighlightServices = [
  {
    icon: <Map className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
    link: "/service/transport",
    label: "ตารางและแผนที่รถไฟฟ้า",
  },
  {
    icon: <Cctv className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
    link: "/service/security",
    label: "ขอดูกล้องวงจรปิด",
  },
  {
    icon: <FileText className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
    link: "/service/data",
    label: "บริการข้อมูล",
  },
  {
    icon: <Waves className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
    link: "/service/utility",
    label: "สาธารณูปโภค",
  },
  {
    icon: <Building className="w-16 h-16" color="#6869AA" strokeWidth={1.5} />,
    link: "/service/building",
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
    description: "ข่าวประชาสัมพันธ์จากหน่วยงานต่างๆ ของมหาวิทยาลัยเชียงใหม่",
    imageUrl: "/news_2.png",
  },
  {
    title: "ประกาศจากหน่วยงานรักษาความปลอดภัย",
    description: "ประกาศจากหน่วยงานรักษาความปลอดภัยเกี่ยวกับการเข้า-ออก มช.",
    imageUrl: "/news_3.png",
  },
  {
    title: "ข่าวสารการจราจรในเขต มช.",
    description: "ข่าวสารการจราจรในเขต มช. เพื่อความสะดวกในการเดินทาง",
    imageUrl: "/news_4.png",
  },
];

export default function HomePage() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white">
      <Header title="หน้าหลัก" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        <div className="max-w-[80%] mx-auto">
          
          {/* Vehicle Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="relative w-full max-w-7xl mx-auto">
              <div className="relative w-full h-[300px] sm:h-[400px]">
                <Image
                  src="/DSC06224.jpg"
                  alt="Angkaew"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-transparent flex flex-col justify-center px-6 sm:px-8">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4 font-prompt">
                    ลงทะเบียนสิทธิ์เข้า-ออก มช.
                  </h2>
                  <p className="text-white text-sm sm:text-base max-w-md mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                    nesciunt fugiat tempore in consequatur error quas ab, vitae
                    fugit earum.
                  </p>
                  <a
                    href="#"
                    className="w-full sm:w-auto"
                    style={{ maxWidth: "200px" }}
                  >
                    <button className="bg-[#6869AA] text-white px-4 py-2 rounded-md text-sm sm:text-base w-max hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                      เข้าสู่ระบบลงทะเบียนยานพาหนะ
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Highlight Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <section className="pb-6">
              <div className="relative mx-auto mt-10">
                <div className="bg-[#FAAF39D1] rounded-md py-6 px-6 shadow-lg flex flex-wrap justify-center md:justify-around gap-6 text-center text-purple-800 text-sm font-medium">
                  {HighlightServices.map((service, index) => (
                    <a key={index} href={service.link}>
                      <div
                        key={index}
                        className="flex flex-col items-center min-w-[100px] max-w-[140px] hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                      >
                        <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center">
                          {service.icon}
                        </div>
                        <span className="text-white pt-2">{service.label}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="absolute -top-4 left-0 bg-white text-yellow-700 px-4 py-2 rounded-tr-xl rounded-bl-md shadow text-sm font-semibold ml-1">
                  Highlight
                  <br />
                  Services
                </div>
              </div>
            </section>
          </motion.div>

          {/* News Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <section className="px-6 py-4 bg-gray-50 rounded-md shadow-md">
              <div className="mb-6">
                {["ข่าวกิจกรรม", "เอกสารเผยแพร่", "บทความ"].map(
                  (text, index) => (
                    <span
                      key={index}
                      className={`text-sm ml-4 pb-1 inline-block hover:cursor-pointer ${
                        index === 0
                          ? "font-bold border-b-2 border-indigo-600 text-black"
                          : "text-gray-400"
                      }`}
                      onClick={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          Array.from(parent.children).forEach((child) => {
                            child.classList.remove(
                              "font-bold",
                              "border-b-2",
                              "border-indigo-600",
                              "text-black"
                            );
                            child.classList.add("text-gray-400", "text-sm");
                          });
                          e.currentTarget.classList.add(
                            "font-bold",
                            "border-b-2",
                            "border-indigo-600",
                            "text-black"
                          );
                          e.currentTarget.classList.remove(
                            "text-gray-400",
                            "text-sm"
                          );
                        }
                      }}
                    >
                      {text}
                    </span>
                  )
                )}
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
                      <h4 className="text-sm font-medium mb-1 text-black">
                        {news.title}
                      </h4>
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
          </motion.div>

          {/* CMU Mobile Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
          >
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
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
