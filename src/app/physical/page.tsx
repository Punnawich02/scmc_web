"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import {
  Map,
  Building,
  TreeDeciduous,
  RadioTower
} from "lucide-react";

const cardData = [
  {
    title: "แผนผังมช.",
    link: "map",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <Map className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "ข้อมูลอาคาร",
    link: "building",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <Building className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "ข้อมูลต้นไม้",
    link: "tree",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <TreeDeciduous className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "Facility",
    link: "facility",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <RadioTower className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  }
];

export default function PhysicalPage() {
  return (
    <div className="grid min-h-screen">
      <Header title="ข้อมูลกายภาพ" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-[80%] justify-center mx-auto">
        <div>
          <div>
            {/* Text box */}
            <h1 className="text-2xl font-bold pb-3">ข้อมูลกายภาพ</h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-center items-center max-w-3xl mx-auto">
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
}
