"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import { motion } from "framer-motion";
import React from "react";

const SecurityPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="งานรักษาความปลอดภัยและจราจร"/>
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full text-black max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold mb-4 mt-4 text-black">
            งานรักษาความปลอดภัยและจราจร
          </h1>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            dignissimos a rerum facere veritatis, nam similique quisquam
            quibusdam consectetur nulla ab, officia modi aspernatur est!
            Consectetur in sunt esse recusandae. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Aspernatur nihil, corporis rem earum
            animi facere, deleniti eveniet amet quaerat ipsum, maiores minima
            quo ratione! Asperiores, explicabo. Pariatur earum explicabo
            quibusdam.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;
