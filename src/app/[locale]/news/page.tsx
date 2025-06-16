"use client";
import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

/*
 * ────────────────────────────────────────────────────────────────────────────────
 *  Types
 * ────────────────────────────────────────────────────────────────────────────────
 */
interface NewsImage {
  SourceLink: string;
  DescriptionThai?: string;
  DescriptionEnglish?: string;
  DescriptionChinese?: string;
  IsCover: boolean;
  Sequence: number;
}

interface NewsItem {
  NewsID: string;
  TitleThai: string;
  TitleEnglish: string;
  TitleChinese?: string;
  DetailThai?: string;
  DetailEnglish?: string;
  DetailChinese?: string;
  ActivityStartDate?: string;
  ActivityStopDate?: string;
  OrganizationNameThai?: string;
  OrganizationNameEnglish?: string;
  OrganizationNameChinese?: string;
  Images?: NewsImage[];
  [key: string]: unknown; // future‑proof
}

interface NewsApiResponse {
  data: NewsItem[];
  message?: string;
}

/*
 * ────────────────────────────────────────────────────────────────────────────────
 *  Helpers
 * ────────────────────────────────────────────────────────────────────────────────
 */
const fetchNews = async (): Promise<NewsApiResponse> => {
  const res = await fetch("/api/news", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—";

/*
 * ────────────────────────────────────────────────────────────────────────────────
 *  Component
 * ────────────────────────────────────────────────────────────────────────────────
 */
const MAX_NEWS = 8; // ← เปลี่ยนตัวเลขนี้ถ้าอยากโชว์มาก/น้อยกว่านี้

const NewsPage: React.FC = () => {
  const locale = useLocale();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchNews();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  }, []);

  // Localised helpers
  const tTitle = (it: NewsItem) => {
    if (locale === "th") return it.TitleThai || "ไม่มีชื่อภาษาไทย";
    if (locale === "zh") return it.TitleChinese || "No Chinese title";
    return it.TitleEnglish || it.TitleThai || "Untitled";
  };

  const tContent = (it: NewsItem) => {
    if (locale === "th") return it.DetailThai || "ไม่มีเนื้อหาไทย";
    if (locale === "zh") return it.DetailChinese || "No Chinese content";
    return it.DetailEnglish || it.DetailThai || "No content";
  };

  if (error) return <p className="text-red-600">{error}</p>;

  // จำกัดจำนวนข่าวที่จะแสดง
  const displayItems = items.slice(0, MAX_NEWS);

  return (
    <main className="bg-white px-4 py-6 text-gray-800 w-full h-full">
      <h1 className="text-3xl font-bold mb-6">News</h1>

      {displayItems.map((it) => (
        <article key={it.NewsID} className="border rounded-xl p-6 mb-12 shadow-sm">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4">{tTitle(it)}</h2>

          {/* Meta info */}
          <div className="text-sm text-gray-500 mb-4 space-y-1">
            {it.OrganizationNameEnglish && (
              <p>
                <span className="font-medium">Org:</span> {it.OrganizationNameEnglish}
              </p>
            )}
            {it.ActivityStartDate && (
              <p>
                <span className="font-medium">When:</span> {formatDate(it.ActivityStartDate)}
                {it.ActivityStopDate && ` – ${formatDate(it.ActivityStopDate)}`}
              </p>
            )}
          </div>

          {/* Content */}
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: tContent(it) }}
          />

          {/* Images */}
          {it.Images && it.Images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {it.Images.sort((a, b) => a.Sequence - b.Sequence).map((img) => (
                <Image
                  key={img.SourceLink}
                  src={img.SourceLink}
                  alt={img.DescriptionEnglish || img.DescriptionThai || "News image"}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Language availability */}
          <div className="pt-4 border-t text-sm text-gray-600">
            <p className="mb-2 font-medium">Available languages:</p>
            <div className="flex gap-2 flex-wrap">
              {it.DetailThai && <span className="px-2 py-0.5 bg-gray-100 rounded">ไทย</span>}
              {it.DetailEnglish && <span className="px-2 py-0.5 bg-gray-100 rounded">English</span>}
              {it.DetailChinese && <span className="px-2 py-0.5 bg-gray-100 rounded">中文</span>}
            </div>
          </div>
        </article>
      ))}

      {/* Raw dump for debugging (optional) */}
      {process.env.NODE_ENV === "development" && (
        <details className="bg-gray-100 p-4 rounded-lg">
          <summary className="cursor-pointer font-semibold mb-2">Raw JSON</summary>
          <pre className="whitespace-pre-wrap text-xs overflow-auto">
            {JSON.stringify(items, null, 2)}
          </pre>
        </details>
      )}
    </main>
  );
};

export default NewsPage;
