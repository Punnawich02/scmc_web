"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const SecurityPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="งานรักษาความปลอดภัยและจราจร"/>
      <main className="font-[Prompt]">
        <h1>Security Page</h1>
        <p>Welcome to the Security page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;
