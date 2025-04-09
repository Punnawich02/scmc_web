import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Cctv, FileText, Waves, Building, Map } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto">
          <div className="relative w-full h-[300px] sm:h-[400px]">
            <Image
              src="/DSC06224.jpg"
              alt="Angkaew"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
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
                <button className="bg-[#6869AA] text-white px-4 py-2 rounded-md hover:bg-[#6869AA]/80 text-sm sm:text-base w-max hover:cursor-pointer">
                  เข้าสู่ระบบลงทะเบียนยานพาหนะ
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="px-6 py-8 w-full bg-[#FAAF39D1]">
          <div className="flex flex-col items-center space-y-4">
            <div
              className="text-center"
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: 800,
                lineHeight: "normal",
              }}
            >
              Highlight Services
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-6xl">
              {[
                {
                  icon: <Map className="w-6 h-6" color="#6869aa" />,
                  text: "ตารางและแผนที่รถไฟฟ้า",
                },
                {
                  icon: <Cctv className="w-6 h-6" color="#6869aa" />,
                  text: "ขอดูกล้องวงจรปิด",
                },
                {
                  icon: <FileText className="w-6 h-6" color="#6869aa" />,
                  text: "บริการข้อมูล",
                },
                {
                  icon: <Waves className="w-6 h-6" color="#6869aa" />,
                  text: "สาธารณูปโภค",
                },
                {
                  icon: <Building className="w-6 h-6" color="#6869aa" />,
                  text: "ขอใช้สถานที่",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-sm text-center hover:bg-white/80 hover:cursor-pointer"
                  style={{
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 900,
                    lineHeight: "normal",
                  }}
                >
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-xs text-gray-700">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="px-6 py-4 bg-gray-50">
          <div className="mb-6">
            <h3 className="text-lg font-medium border-b-2 border-indigo-600 inline-block pb-1 hover:cursor-pointer">
              ข่าวกิจกรรม
            </h3>
            <span className="text-gray-400 text-sm ml-4 hover:cursor-pointer">
              เอกสารเผยแพร่
            </span>
            <span className="text-gray-400 text-sm ml-4 hover:cursor-pointer">
              บทความ
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-md overflow-hidden shadow-sm"
              >
                <Image
                  src={`/news_${item}.png`}
                  alt={`News ${item}`}
                  width={271}
                  height={163}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-1">
                    กิจกรรมพิเศษสำหรับนักศึกษา CMU ปี 1-4
                  </h4>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    กิจกรรมพิเศษสำหรับนักศึกษา มช. ประจำปีการศึกษา 2025
                    เพื่อส่งเสริมการเรียนรู้และพัฒนาทักษะนอกห้องเรียน
                  </p>
                  <a href="#" className="text-indigo-600 text-xs">
                    อ่านเพิ่มเติม
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="bg-amber-400 text-gray-700 px-4 py-1 rounded text-sm hover:cursor-pointer hover:bg-amber-300">
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
              className="w-full object-contain rounded-md hover:shadow-lg hover:cursor-pointer"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
