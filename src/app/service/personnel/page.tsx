"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import { Card, CardBody } from "@heroui/card";
import { Car ,File ,Globe } from 'lucide-react';
import React from "react";

const BuildingPage: React.FC = () => {
  return (
    <div>
      <Header title="สำหรับบุคลากร" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-[80%] justify-center mx-auto">
        <div>
          <div>
            {/* Text box */}
            <h1 className="text-2xl font-bold pb-3">สำหรับบุคลากร</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              excepturi harum error laborum nemo eaque et maxime iste repellat
              culpa fuga, unde velit mollitia praesentium. Voluptates quod
              praesentium molestias nihil. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Totam delectus illo, sequi maxime
              nesciunt vero reiciendis aliquid eligendi accusamus ducimus quis
              corporis id iusto doloribus aut sit. Repellendus, minima
              blanditiis!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <a href="#">
              <Card className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer">
                <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                  <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                    <Car className="w-16 h-16" color="#FFF" />
                  </div>
                  <h2 className="text-lg font-bold text-white text-center sm:text-left">
                    จองรถ
                  </h2>
                  <p className="text-sm text-white text-center sm:text-left">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.
                  </p>
                </CardBody>
              </Card>
            </a>
            <a href="#">
              <Card className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer">
                <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                  <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                    <File className="w-16 h-16" color="#FFF" />
                  </div>
                  <h2 className="text-lg font-bold text-white text-center sm:text-left">
                    คลังเอกสาร
                  </h2>
                  <p className="text-sm text-white text-center sm:text-left">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.
                  </p>
                </CardBody>
              </Card>
            </a>
            <a href="#">
              <Card className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer">
                <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                  <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                    <Globe className="w-16 h-16" color="#FFF" />
                  </div>
                  <h2 className="text-lg font-bold text-white text-center sm:text-left">
                    CMU.to
                  </h2>
                  <p className="text-sm text-white text-center sm:text-left">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.
                  </p>
                </CardBody>
              </Card>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuildingPage;
