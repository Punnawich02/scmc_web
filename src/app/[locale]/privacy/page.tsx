"use client";
import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");
  const [iframeError, setIframeError] = useState(false);

  // URL for the privacy policy
  const privacyPolicyUrl = "https://scmc.cmu.ac.th/web/privacy/content?1750390260";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-[Prompt]">
      <Header title={t("page_title")} />
      <main className="flex flex-col items-center px-4 py-6 sm:py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full mb-6 sm:mb-9"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#6869AA] w-full text-left">
            {t("header")}
          </h1>
          
          {iframeError ? (
            <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
              <h2 className="text-xl font-semibold mb-3">Unable to load privacy policy content</h2>
              <p className="mb-4">
                We&apos;re having trouble loading our privacy policy from the source server. Please try one of the following options:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li className="mb-2">
                  <a 
                    href={privacyPolicyUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View the privacy policy directly
                  </a>
                </li>
                <li>Try refreshing this page</li>
              </ul>
            </div>
          ) : (
            <div className="w-full mt-6">
              <iframe
                src={privacyPolicyUrl}
                title="Privacy Policy"
                width="100%"
                height="600"
                style={{ border: "none" }}
                onError={() => setIframeError(true)}
                onLoad={(e) => {
                  // Sometimes iframes can "load" but still fail
                  try {
                    // Attempt to access iframe content - will fail if connection refused
                    const iframeContent = e.currentTarget.contentWindow;
                    if (!iframeContent) setIframeError(true);
                  } catch {
                    setIframeError(true);
                  }
                }}
              ></iframe>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}