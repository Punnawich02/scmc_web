"use client";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Database } from "lucide-react";
import Image from "next/image";
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  displayNameTh: string;
  displayNameEn: string;
  createdAt: string;
  updatedAt: string;
}

interface TransportImage {
  id: number;
  categoryId: number;
  imageUrl: string;
  title: string;
  uploadBy: string;
  uploadAt: string;
  isActive: boolean;
}

const TransportPage: React.FC = () => {
  const t = useTranslations("TransportPage");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transportImages, setTransportImages] = useState<TransportImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // ฟังก์ชันดึงข้อมูล categories จาก API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/transit_page'); // เปลี่ยน URL ตาม API ที่คุณใช้งาน
      setCategories(response.data);
      // ตั้งค่า category แรกเป็น default
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันดึงข้อมูลรูปภาพตาม categoryName
  const fetchImagesByCategory = async (categoryName: string) => {
    try {
      setImageLoading(true);
      const response = await axios.get(`/api/transit_page/${categoryName}`); // เปลี่ยน URL ตาม API ที่คุณใช้งาน
      setTransportImages(response.data.filter((img: TransportImage) => img.isActive));
      setImageError({}); // รีเซ็ต error state เมื่อมีการโหลดข้อมูลใหม่
    } catch (error) {
      console.error('Error fetching transport images:', error);
      setTransportImages([]);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // เมื่อ selectedCategory เปลี่ยน ให้โหลดรูปภาพใหม่
  useEffect(() => {
    if (selectedCategory) {
      fetchImagesByCategory(selectedCategory.name);
    }
  }, [selectedCategory]);

  // ฟังก์ชันหา displayName ตาม locale
  const getDisplayName = (category: Category) => {
    return locale === 'th' ? category.displayNameTh : category.displayNameEn;
  };

  // ฟังก์ชันเมื่อเลือก category ใหม่
  const handleCategorySelection = (category: Category) => {
    setSelectedCategory(category);
  };

  // ฟังก์ชันจัดการเมื่อรูปโหลดไม่สำเร็จ
  const handleImageError = (imageId: number) => {
    setImageError((prev) => ({ ...prev, [imageId]: true }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col font-[Prompt] text-gray-800">
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
          {/* Dropdown */}
          <div className="mt-8 w-full">
            <details className="w-full group">
              <summary className="w-full flex items-center justify-between bg-[#E9EAFF] border-3 border-[#8586D1] rounded-full px-4 py-2 shadow hover:shadow-md focus:outline-none cursor-pointer list-none">
                <h2 className="text-base font-semibold text-[#22223b] flex-1 text-center">
                  {selectedCategory ? getDisplayName(selectedCategory) : t("select_category")}
                </h2>
                <ChevronDown className="text-[#6366F1] ml-1 w-5 h-5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-3 px-4 py-2 bg-white rounded-2xl shadow">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left font-medium ${
                          selectedCategory?.id === category.id
                            ? "text-[#6366F1]"
                            : "text-[#22223b] hover:text-[#6366F1] hover:cursor-pointer"
                        }`}
                        onClick={() => handleCategorySelection(category)}
                        type="button"
                      >
                        {getDisplayName(category)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
            {/* Content */}
            <div className="mt-6">
              {imageLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]"></div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {transportImages.length > 0 ? (
                    transportImages.map((image) => (
                      <div key={image.id} className="flex flex-row justify-center">
                        {imageError[image.id] ? (
                          <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg">
                            <p className="text-gray-500">{t("image_not_available")}</p>
                          </div>
                        ) : (
                          <div className="w-full">
                            <Image
                              src={image.imageUrl}
                              alt={image.title}
                              width={500}
                              height={500}
                              className="w-full h-auto rounded-lg shadow-md"
                              onError={() => handleImageError(image.id)}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      {t("no_images_found")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default TransportPage;