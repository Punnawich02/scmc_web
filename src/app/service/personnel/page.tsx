"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="สำหรับบุคลากร" />
      <main>
        <h1>Personnel Page</h1>
        <p>Welcome to the personnel page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
