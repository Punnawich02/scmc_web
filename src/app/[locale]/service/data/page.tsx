"use client";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Database } from "lucide-react";

// Type สำหรับข้อมูล Category
interface DataCategory {
  id: number;
  name: string;
  description: string;
  displayNameTh: string;
  displayNameEn: string;
  createdAt: string;
}

// Type สำหรับข้อมูล Dashboard
interface DashboardData {
  id: number;
  categoryId: number;
  title: string;
  embedCode: string;
  createdAt: string;
  isActive: boolean;
}

const DataPage: React.FC = () => {
  const t = useTranslations("DataPage");
  const locale = useLocale();
  const [categories, setCategories] = useState<DataCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DataCategory | null>(
    null
  );
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // เรียกใช้ API สำหรับ Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/data_page");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: DataCategory[] = await response.json();
        setCategories(data);
        // ตั้งค่าเป็นรายการแรกโดยอัตโนมัติ
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // เรียกใช้ API สำหรับ Dashboard Data เมื่อเลือก Category
  useEffect(() => {
    const fetchDashboardData = async (categoryName: string) => {
      setDashboardLoading(true);
      try {
        const response = await fetch(`/api/data_page/${categoryName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data: DashboardData[] = await response.json();
        setDashboardData(data.filter((item) => item.isActive));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setDashboardData([]);
      } finally {
        setDashboardLoading(false);
      }
    };

    if (selectedCategory) {
      fetchDashboardData(selectedCategory.name);
    }
  }, [selectedCategory]);

  // ฟังก์ชันสำหรับแสดงชื่อตาม locale
  const getDisplayName = (category: DataCategory): string => {
    return locale === "th" ? category.displayNameTh : category.displayNameEn;
  };

  // Component สำหรับแสดง Embed Code - ปรับปรุงแล้ว
  const EmbedCodeRenderer: React.FC<{ 
    embedCode: string; 
    dashboardId: number; 
  }> = ({ embedCode, dashboardId }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
      // สร้าง unique container id
      const containerId = `embed-container-${dashboardId}`;
      const container = document.getElementById(containerId);
      
      if (!container) return;

      // ล้างเนื้อหาเดิม
      container.innerHTML = '';
      
      // สร้าง wrapper div
      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.minHeight = '400px'; // กำหนดความสูงขั้นต่ำ
      wrapper.style.overflow = 'visible'; // ให้แสดงเนื้อหาที่เกิน
      
      // แทรก embed code
      wrapper.innerHTML = embedCode;
      container.appendChild(wrapper);

      // จัดการ scripts ใน embed code
      const scripts = wrapper.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        
        // คัดลอก attributes
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // คัดลอก content
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.onload = () => setIsLoaded(true);
        } else {
          newScript.textContent = oldScript.textContent;
        }
        
        // แทนที่ script เก่าด้วยใหม่
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      // หาก embed code มี iframe ให้จัดการ responsive
      const iframes = wrapper.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.style.width = '100%';
        iframe.style.minHeight = '400px';
        iframe.style.border = 'none';
        
        // เพิ่ม event listener เพื่อปรับขนาดอัตโนมัติ
        iframe.onload = () => {
          try {
            // พยายามปรับขนาดตาม content
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              const height = Math.max(
                iframeDoc.documentElement.scrollHeight,
                iframeDoc.body.scrollHeight,
                400 // ความสูงขั้นต่ำ
              );
              iframe.style.height = `${height}px`;
            }
          } catch {
            // หากไม่สามารถเข้าถึง iframe content ได้ (CORS)
            iframe.style.height = '500px'; // ใช้ความสูงเริ่มต้น
          }
          setIsLoaded(true);
        };
      });

      // หาก embed code มี div หรือ element อื่น
      const embeddedDivs = wrapper.querySelectorAll('div[id*="viz"], div[class*="tableauPlaceholder"]');
      embeddedDivs.forEach((div) => {
        (div as HTMLElement).style.width = '100%';
        (div as HTMLElement).style.overflowX = 'auto';
      });

      setIsLoaded(true);

      // Cleanup function
      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
    }, [embedCode, dashboardId]);

    return (
      <div className="w-full">
        {!isLoaded && (
          <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
          </div>
        )}
        <div 
          id={`embed-container-${dashboardId}`} 
          className="w-full min-h-[400px] overflow-visible"
          style={{ 
            display: isLoaded ? 'block' : 'none'
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
        <Header title={t("page_title")} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366F1]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
        <Header title={t("page_title")} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500 text-center">
              <p className="text-lg font-semibold">Error loading data</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800 bg-white">
      <Header title={t("page_title")} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:py-10">
        {/* Header Card */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="rounded-2xl bg-[#8F90E5] p-6 shadow-lg">
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start">
              {/* Icon */}
              <div className="bg-[#5759BB] rounded-full p-4 shadow-lg sm:absolute sm:top-0 sm:left-0 mb-4 sm:mb-0">
                <Database className="w-10 h-10 text-white" />
              </div>
              {/* ข้อความ */}
              <div className="sm:ml-24 text-center sm:text-left">
                <h1 className="text-white font-extrabold text-3xl leading-snug mb-2">
                  {t("header")}
                </h1>
                <p className="text-white/90 text-base max-w-xl">{t("title")}</p>
              </div>
            </div>
          </div>

          {/* Category Dropdown */}
          {categories.length > 0 && selectedCategory && (
            <div className="mt-8 w-full">
              <details className="w-full group">
                <summary className="w-full flex items-center justify-between bg-[#E9EAFF] border-3 border-[#8586D1] rounded-full px-4 py-2 shadow hover:shadow-md focus:outline-none cursor-pointer list-none">
                  <h2 className="text-base font-semibold text-[#22223b] flex-1 text-center">
                    {getDisplayName(selectedCategory)}
                  </h2>
                  <ChevronDown className="text-[#6366F1] ml-1 w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-3 px-4 py-2 bg-white rounded-2xl shadow">
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          className={`w-full text-left font-medium py-1 px-2 rounded transition-colors ${
                            selectedCategory.id === category.id
                              ? "text-[#6366F1] bg-[#F1F2FF]"
                              : "text-[#22223b] hover:text-[#6366F1] hover:bg-[#F8F9FF] hover:cursor-pointer"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                          type="button"
                        >
                          {getDisplayName(category)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              {/* Dashboard Content */}
              <div className="mt-6 w-full">
                {dashboardLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                  </div>
                ) : dashboardData.length > 0 ? (
                  <div className="space-y-8">
                    {dashboardData.map((dashboard) => (
                      <div
                        key={dashboard.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                      >
                        <div className="p-6 border-b border-gray-100">
                          <h3 className="text-lg font-semibold text-[#22223b] mb-2">
                            {dashboard.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {locale === "th" ? "อัปเดตล่าสุด" : "Last updated"}:{" "}
                            {new Date(dashboard.createdAt).toLocaleDateString(
                              locale === "th" ? "th-TH" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        
                        {/* Embed Code Container - ปรับปรุงแล้ว */}
                        <div className="w-full">
                          <EmbedCodeRenderer
                            embedCode={dashboard.embedCode}
                            dashboardId={dashboard.id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {locale === "th"
                        ? "ไม่มีข้อมูลสำหรับหมวดหมู่นี้"
                        : "No data available for this category"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ข้อความเมื่อไม่มีข้อมูล */}
          {categories.length === 0 && (
            <div className="mt-8 text-center py-12">
              <p className="text-gray-500 text-lg">
                {locale === "th" ? "ไม่มีข้อมูลให้แสดง" : "No data available"}
              </p>
            </div>
          )}
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default DataPage;