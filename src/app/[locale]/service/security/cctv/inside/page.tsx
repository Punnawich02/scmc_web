"use client";

import Header from "../../../../Component/Header";
import Footer from "../../../../Component/Footer";
import { useTranslations } from "next-intl";

const InsidePage = () => {
  const t = useTranslations("FixPage");
  //   const locale = useLocale();

  //   const [token, setToken] = useState(null);

  //   interface BasicInfo {
  //     itaccounttype_EN: string;
  //     itaccounttype_TH: string;
  //     organization_name_EN: string;
  //     firstname_TH: string;
  //     lastname_TH: string;
  //     firstname_EN: string;
  //     lastname_EN: string;
  //     student_id: string;
  //     organization_name_TH: string;
  //     cmuitaccount: string;
  //   }

  //   const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  //   const [error, setError] = useState<string | null>(null);
  //   const [loading, setLoading] = useState(true);
  //   const router = useRouter();

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         // Fetch the token
  //         const tokenResponse = await fetch("/api/getToken");
  //         if (!tokenResponse.ok) {
  //           if (tokenResponse.status === 401) {
  //             return;
  //           }
  //           throw new Error(`Token fetch error: ${tokenResponse.status}`);
  //         }

  //         const tokenData = await tokenResponse.json();
  //         setToken(tokenData);

  //         // Fetch user's basic info using the token
  //         const basicInfoResponse = await fetch("/api/getUserInfo", {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         if (!basicInfoResponse.ok) {
  //           throw new Error(`API error: ${basicInfoResponse.status}`);
  //         }

  //         const userData = await basicInfoResponse.json();
  //         setBasicInfo(userData);
  //       } catch (err) {
  //         console.error("Failed to fetch data:", err);
  //         const errorMessage =
  //           err instanceof Error ? err.message : "Unknown error";
  //         setError("Failed to load profile data: " + errorMessage);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     fetchData();
  //   }, [router]);

  //   if (loading) {
  //     return (
  //       <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
  //         <Header title={t("page_title")} />
  //         <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
  //           Loadind profile data...
  //         </main>
  //         <Footer />
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
  //         <Header title={t("page_title")} />
  //         <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
  //           Error : {error}
  //         </main>
  //         <Footer />
  //       </div>
  //     );
  //   }

  //   if (token) {
  //     return (
  //       <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
  //         <Header title="" />
  //         <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
  //           <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
  //             สำหรับบุคลากร / นักศึกษา ในมช
  //           </h1>
  //           <button className="bg-[#6869AA] text-white px-4 py-2 rounded-xl text-sm sm:text-base w-full hover:cursor-pointer hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
  //             เข้าสู่ระบบ / login
  //           </button>
  //         </main>
  //         <Footer />
  //       </div>
  //     );
  //   }

  //   if (!basicInfo) {
  //     return (
  //       <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
  //         <Header title={t("page_title")} />
  //         <main className="flex flex-col gap-8 px-4 py-6 w-full text-black max-w-7xl mx-auto mb-10 justify-center items-center">
  //           No data available.
  //         </main>
  //         <Footer />
  //       </div>
  //     );
  //   }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("title")} />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto mb-10">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
          แบบฟอร์มขอดูกล้องวงจรปิดออนไลน์
        </h1>
        <form className="flex flex-col gap-4 mx-auto w-full bg-gray-50 p-6 rounded-xl shadow">
          {/* Name - ID */}
          <div className="flex flex-row items-center gap-6 w-full">
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">ชื่อ-สกุล</span>
              <input
                type="text"
                className="border rounded-3xl px-3 py-2 w-full"
                value="ธนูทวย คงควรคอย"
                readOnly
              />
            </label>
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">
                เลขบัตรประชาชน
              </span>
              <input
                type="text"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอกเลขบัตรประชาชน"
                required
              />
            </label>
          </div>
          {/* Tel - e-mail - LINE ID */}
          <div className="flex flex-row items-center gap-6 w-full">
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">
                เบอร์โทรศัพท์
              </span>
              <input
                type="text"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอกเบอร์โทร"
                required
              />
            </label>
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">e-mail</span>
              <input
                type="email"
                className="border rounded-3xl px-3 py-2 w-full"
                value="lol@cmu.ac.th"
                readOnly
              />
            </label>
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">LINE ID</span>
              <input
                type="text"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอก LINE ID"
                required
              />
            </label>
          </div>
          {/* Reason */}
          <div className="">
            <label className="flex flex-row">
              <span className="font-medium">เหตุผล</span>
              <textarea
                className="border ms-4 rounded-2xl px-3 py-2 w-full min-h-[150px] resize-vertical"
                placeholder="กรุณากรอกเหตุผลโดยละเอียด"
                required
              />
            </label>
          </div>
          {/* Time Desktop */}
          <div className="flex flex-row items-center gap-6 w-full">
            <label className="flex flex-row items-center flex-1 gap-2">
              <span className="font-medium whitespace-nowrap">
                ตั้งแต่วันที่
              </span>
              <input
                type="date"
                className="border rounded-3xl px-3 py-2 w-full"
                required
              />
              <input
                type="time"
                className="border rounded-3xl px-3 py-2 w-full"
                required
              />
            </label>
            <label className="flex flex-row items-center flex-1 gap-2 hidden lg:hidden-none">
              <span className="font-medium whitespace-nowrap">ถึงวันที่</span>
              <input
                type="date"
                className="border rounded-3xl px-3 py-2 w-full"
                required
              />
              <input
                type="time"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอกชื่อ-สกุล"
                required
              />
            </label>
          </div>
          {/* Time Mobile */}
          <div>
            <label className="flex flex-row items-center flex-1 gap-2 lg:hidden">
              <span className="font-medium whitespace-nowrap">ถึงวันที่</span>
              <input
                type="date"
                className="border rounded-3xl px-3 py-2 w-full"
                required
              />
              <input
                type="time"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอกชื่อ-สกุล"
                required
              />
            </label>
          </div>
          {/* Area */}
          <div>
            <label className="flex flex-row items-center flex-1 gap-2 lg:hidden">
              <span className="font-medium whitespace-nowrap">
                บริเวณที่ขอดูภาพ
              </span>
              <input
                type="text"
                className="border rounded-3xl px-3 py-2 w-full"
                placeholder="กรุณากรอกบริเวณที่ขอดูภาพ"
                required
              />
            </label>
          </div>
          {/* By */}
          <div className="flex flex-row items-start flex-1 gap-2">
            <span className="font-medium whitespace-nowrap me-3">โดยที่</span>
            <div>
              {/* Video Only */}
              <div className="flex flex-col">
                <label className="flex flex-row ms-2">
                  <input
                    type="checkbox"
                    className="border rounded-3xl px-3 py-2 w-[16px]"
                  />
                  <span className="ms-2">ขอดูภาพวิดีโออย่างเดียว</span>
                </label>
                <label className="flex flex-row items-center flex-1 gap-2 ms-8 mt-3">
                  <span className="whitespace-nowrap">ได้รับการอนุญาตจาก</span>
                  <input
                    type="text"
                    className="border rounded-3xl px-3 py-2 w-full"
                    required
                  />
                  <span className="whitespace-nowrap">วันที่</span>
                  <input
                    type="date"
                    className="border rounded-3xl px-3 py-2 w-full"
                    required
                  />
                </label>
              </div>
              {/* Save Video */}
              <div className="flex flex-col mt-10">
                <label className="flex flex-row ms-2 items-center gap-2">
                  <input
                    type="checkbox"
                    className="border rounded-3xl px-3 py-2 w-[16px]"
                  />
                  <span>ขอดูภาพวิดีโอและบันทึกไฟล์</span>
                  <select className="border rounded-3xl px-3 py-2">
                    <option value="mp4">ภาพนิ่ง</option>
                    <option value="avi">ภาพวิดีโอ</option>
                    <option value="mov">ภาพนิ่งและวิดีโอ</option>
                  </select>
                </label>
                <div className="mt-3">
                  <div>
                    <span className="ms-8">โดยมีหลักฐานประกอบ ดังนี้</span>
                    <div className="flex ms-15 mt-3">
                      <input
                        type="checkbox"
                        className="border rounded-3xl px-3 py-2 w-[16px]"
                      />
                      <span className="ms-2">
                        สำเนาบันทึกประจำวันจากสถานีตำรวจฯ
                        หรือหนังสือจากผู้รับผิดชอบคดี
                      </span>
                    </div>
                    <div className="flex ระำทห-หะฟพะ ms-15 mt-3">
                      <input
                        type="checkbox"
                        className="border rounded-3xl px-3 py-2 w-[16px]"
                      />
                      <span className="ms-2">
                        สำเนาบัตรประจำตัวประชาชน หรือสำเนาหนังสือเดินทาง
                        (Passport) <br className="md:hidden" />
                        หรือสำเนาบัตรที่มีหมายเลขบัตรประชาชน
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="ms-8">
                      กรณีมอบอำนาจ เพิ่มเอกสาร (ถ้ามี)
                    </span>
                    <div className="flex ms-15 mt-3">
                      <input
                        type="checkbox"
                        className="border rounded-3xl px-3 py-2 w-[16px]"
                      />
                      <span className="ms-2">หนังสือมอบอำนาจ</span>
                    </div>
                    <div className="flex ระำทห-หะฟพะ ms-15 mt-3">
                      <input
                        type="checkbox"
                        className="border rounded-3xl px-3 py-2 w-[16px]"
                      />
                      <span className="ms-2">
                        สำเนาบัตรประจำตัวประชาชน หรือสำเนาหนังสือเดินทาง
                        (Passport) <br className="md:hidden" />
                        หรือสำเนาบัตรที่มีหมายเลขบัตรประชาชนผู้รับมอบอำนาจ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#6869AA] text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default InsidePage;
