"use client";

import React from "react";
import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import { Card, CardBody } from "@heroui/card";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="ขส.มช." />
      <main className="container mx-auto p-4">
        <div className="flex flex-col justify-center mb-4">
          <h1 className="text-2xl font-bold mb-4 mt-4">
            บริการรถขนส่ง มหาวิทยาลัยเชียงใหม่
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
        </div>
        <div>
          <Card className="w-full bg-white shadow-lg rounded-lg p-4 mb-4 hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:cursor-pointer">
            <CardBody className="flex flex-col items-center">
              ตารางรอบรถไฟฟ้า
            </CardBody>
          </Card>
          <Card className="w-full bg-white shadow-lg rounded-lg p-4 mb-4 hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:cursor-pointer">
            <CardBody className="flex flex-col items-center">
              แผนที่รถไฟฟ้า
            </CardBody>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
