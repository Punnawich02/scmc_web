"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import {
  Database,
  BusFront,
  ShieldUser,
  Building,
  HousePlug,
  UserRound,
} from "lucide-react";

const cardData = [
  {
    title: "บริการข้อมูล",
    title_eng: "data",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <Database className="w-16 h-16" color="#FFF" />,
  },
  {
    title: "ขส.มช.",
    title_eng: "transport",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <BusFront className="w-16 h-16" color="#FFF" />,
  },
  {
    title: "งานรักษาความปลอดภัยและจราจร",
    title_eng: "security",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <ShieldUser className="w-16 h-16" color="#FFF" />,
  },
  {
    title: "งานอาคารสถานที่",
    title_eng: "building",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <Building className="w-16 h-16" color="#FFF" />,
  },
  {
    title: "สาธารณูปโภค",
    title_eng: "utility",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <HousePlug className="w-16 h-16" color="#FFF" />,
  },
  {
    title: "สำหรับบุคลากร",
    title_eng: "personnel",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <UserRound className="w-16 h-16" color="#FFF" />,
  },
];

export default function Home() {
  return (
    <div className="grid min-h-screen">
      <Header title="Services" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-full">
        <div>
          <div>
            {/* Text box */}
            <h1 className="text-2xl font-bold">บริการของเรา</h1>
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
            {" "}
            {/* Data Service */}
            {cardData.map((card, index) => (
              <a href={`/service/${card.title_eng}`} key={index}>
                <Card
                  key={index}
                  className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer"
                >
                  <CardBody className="flex flex-col items-left gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full">
                    <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white">{card.description}</p>
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
