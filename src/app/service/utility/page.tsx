"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="สาธาณูปโภค"/>
      <main>
        <h1>Utility Page</h1>
        <p>Welcome to the Utility page!</p>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
