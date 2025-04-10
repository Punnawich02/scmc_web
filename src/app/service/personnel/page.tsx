"use client";

import Footer from "@/app/Component/Footer";
import Header from "@/app/Component/Header";
import { Card, CardBody } from "@heroui/card";
import { Car, File, Globe } from "lucide-react";
import React from "react";

const cardData = [
  {
    title: "จองรถ",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.",
    icon: <Car className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "คลังเอกสาร",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.",
    icon: <File className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "CMU.to",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima commodi explicabo incidunt sunt deleniti porro fugiat adipisci numquam facilis, unde consectetur fugit aspernatur rem labore, quaerat similique sit impedit odit.",
    icon: <Globe className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
];

const PersonnelPage: React.FC = () => {
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
            {cardData.map((card, index) => (
              // Edit Link to point to the correct page
              <a href={`#`} key={index}>
                <Card
                  key={index}
                  className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer h-full"
                >
                  <CardBody className="flex flex-col items-center sm:items-start gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full h-full">
                    <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h2 className="text-lg font-bold text-white text-center sm:text-left">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white text-center sm:text-left">
                      {card.description}
                    </p>
                  </CardBody>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonnelPage;
