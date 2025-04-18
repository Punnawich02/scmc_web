"use client";

import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Card, CardBody } from "@heroui/card";
import { Eye, User } from "lucide-react";
import { motion } from "framer-motion";

// Data for the cards displayed on the page
const cardData = [
  {
    title: "วิสัยทัศน์ / พันธะกิจ / โครงสร้าง",
    link: "vision",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <Eye className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
  {
    title: "หน่วยงาน และ Contact",
    link: "contact",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    icon: <User className="w-16 h-16" color="#FFF" strokeWidth={1.5} />,
  },
];

export default function AboutPage() {
  return (
    <div className="grid min-h-screen bg-white">
      {/* Header component */}
      <Header title="เกี่ยวกับเรา" />
      <main className="flex flex-col gap-8 px-4 sm:px-8 py-6 w-[80%] justify-center mx-auto font-[Prompt]">
        <div>
          {/* Text Box */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div>
              <h1 className="text-2xl font-bold pb-3 text-black">
                เกี่ยวกับเรา
              </h1>
              <p className="text-sm text-gray-700">
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
          </motion.div>
          {/* Card Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-center items-center max-w-3xl mx-auto">
            {cardData.map((card, index) => (
              // Each card is wrapped in a link (currently pointing to "#")
              <a href={`#`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {/* Card component */}
                  <Card
                    key={index}
                    className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer h-full"
                  >
                    <CardBody className="flex flex-col items-center gap-4 p-6 bg-[#9799E7] rounded-lg shadow-lg w-full h-full sm:items-start min-h-[20rem]">
                      {/* Icon inside a circular background */}
                      <div className="w-24 h-24 rounded-full bg-[#5759BB] flex items-center justify-center">
                        {card.icon}
                      </div>
                      {/* Card content */}
                      <div className="flex flex-col items-center gap-2 sm:items-start">
                        <h2 className="text-lg font-bold text-white text-center sm:text-left min-h-[3rem] md:min-h-0">
                          {card.title}
                        </h2>
                        <p className="text-sm text-white text-center sm:text-left">
                          {card.description}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
}
