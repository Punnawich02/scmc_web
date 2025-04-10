"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const DataPage: React.FC = () => {
  return (
    <div>
      <Header title="บริการข้อมูล"/>
      <main>
        <h1>Data Page</h1>
        <p>Welcome to the data page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default DataPage;
