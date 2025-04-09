"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="งานรักษาความปลอดภัยและจราจร"/>
      <main>
        <h1>Security Page</h1>
        <p>Welcome to the Security page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
