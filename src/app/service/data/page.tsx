"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const DataPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="บริการข้อมูล"/>
      <main className="font-[Prompt]">
        <h1>Data Page</h1>
        <p>Welcome to the data page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default DataPage;
