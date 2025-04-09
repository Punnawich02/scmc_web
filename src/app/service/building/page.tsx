"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="งานอาคารและสถานที่"/>
      <main>
        <h1>Building Page</h1>
        <p>Welcome to the building page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
