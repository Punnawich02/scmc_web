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
  const [selectedCategory, setSelectedCategory] = useState<DataCategory | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // เรียกใช้ API สำหรับ Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/data_page'); // แทนที่ด้วย endpoint จริง
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: DataCategory[] = await response.json();
        setCategories(data);
        // ตั้งค่าเป็นรายการแรกโดยอัตโนมัติ
        if (data.length > 0) {
          setSelectedCategory(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching categories:', err);
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
        const response = await fetch(`/api/data_page/${categoryName}`); // แทนที่ด้วย endpoint จริง
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data: DashboardData[] = await response.json();
        setDashboardData(data.filter(item => item.isActive)); // แสดงเฉพาะที่ active
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
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
    return locale === 'th' ? category.displayNameTh : category.displayNameEn;
  };

  // Component สำหรับแสดง Embed Code
  const EmbedCodeRenderer: React.FC<{ embedCode: string }> = ({ embedCode }) => {
    useEffect(() => {
      // ลบ script tags เก่าทิ้งก่อน (ถ้ามี)
      const existingScripts = document.querySelectorAll('script[src*="tableau"]');
      existingScripts.forEach(script => script.remove());

      // สร้าง div container ชั่วคราว
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = embedCode;

      // หา script tags และเรียกใช้
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });

      return () => {
        // Cleanup เมื่อ component unmount
        const tableauScripts = document.querySelectorAll('script[src*="tableau"]');
        tableauScripts.forEach(script => script.remove());
      };
    }, [embedCode]);

    return (
      <div 
        className="w-full"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-10">
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
              <div className="mt-6">
                {dashboardLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                  </div>
                ) : dashboardData.length > 0 ? (
                  <div className="space-y-6">
                    {dashboardData.map((dashboard) => (
                      <div key={dashboard.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-[#22223b] mb-2">
                            {dashboard.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {locale === 'th' ? 'อัปเดตล่าสุด' : 'Last updated'}: {' '}
                            {new Date(dashboard.createdAt).toLocaleDateString(
                              locale === 'th' ? 'th-TH' : 'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }
                            )}
                          </p>
                        </div>
                        
                        {/* Embed Code Renderer */}
                        <div className="w-full overflow-hidden rounded-lg">
                          <EmbedCodeRenderer embedCode={dashboard.embedCode} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {locale === 'th' 
                        ? 'ไม่มีข้อมูลสำหรับหมวดหมู่นี้' 
                        : 'No data available for this category'
                      }
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
                {locale === 'th' ? 'ไม่มีข้อมูลให้แสดง' : 'No data available'}
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