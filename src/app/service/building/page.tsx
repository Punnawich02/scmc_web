"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import { Card, CardBody } from "@heroui/card";
import { Building2, CheckCheck } from "lucide-react";
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="งานอาคารและสถานที่" />
      <main className="container mx-auto p-4 justify-center items-center w-[80%]">
        <div className="flex flex-col justify-center mb-4">
          <h1 className="text-2xl font-bold mb-4 mt-4">งานอาคาร และสถานที่</h1>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-center items-center max-w-3xl mx-auto">
          <a href="#">
            <Card className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer">
              <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                  <Building2 className="w-16 h-16" color="#FFF" />
                </div>
                <h2 className="text-lg font-bold text-white text-center sm:text-left">
                  ขอใช้สถานที่
                </h2>
                <p className="text-sm text-white text-center sm:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem, molestias, hic in mollitia earum maiores dolor
                  similique accusamus debitis itaque necessitatibus eos veniam
                  sequi porro nobis optio eveniet aliquam doloremque?
                </p>
              </CardBody>
            </Card>
          </a>
          <a href="#">
            <Card className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer">
              <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                  <CheckCheck className="w-16 h-16" color="#FFF" />
                </div>
                <h2 className="text-lg font-bold text-white text-center sm:text-left">
                  ตรวจแบบ
                </h2>
                <p className="text-sm text-white text-center sm:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem, molestias, hic in mollitia earum maiores dolor
                  similique accusamus debitis itaque necessitatibus eos veniam
                  sequi porro nobis optio eveniet aliquam doloremque?
                </p>
              </CardBody>
            </Card>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
