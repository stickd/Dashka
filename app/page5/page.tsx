"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "../../components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface Project {
  title: string;
  location: string;
  year: string;
  client: string;
  status: string;
  description: string;
  images: string[];
}

export default function ProjectPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const project: Project = {
    title: "Reconnect - Collective Housing",
    location: "Shenzhen, China",
    year: "2017",
    client: "Bee Breeders",
    status: "Competition (Shortlisted)",
    description: `The Reconnect Housing block was an urban housing solution for Shenzhen. 
We focused on community living, open courtyards, and flexible apartment layouts to enhance urban life.`,
    images: [
      "/projects/reconnect/1.jpg",
      "/projects/reconnect/2.jpg",
      "/projects/reconnect/3.jpg",
      "/projects/reconnect/4.jpg",
    ],
  };

  return (
    <section className="relative w-full min-h-screen overflow-visible">
      {/* Фон + оранжевая сетка */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e] z-0" />
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(252,170,103,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(252,170,103,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-8">
        {/* Галерея слева */}
        <div className="flex-1 flex flex-col gap-6">
          {project.images.map((src, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 90 }}
              className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer shadow-lg border-2 border-[#fcaa67]/70"
            >
              <Image
                src={src}
                alt={`${project.title} ${idx + 1}`}
                fill
                className="object-cover pointer-events-none"
              />
              {hoveredIndex === idx && (
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-[#fcaa67] text-lg md:text-xl font-semibold">
                  View Image
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Текст справа (фиксированный всегда) */}
        <div className="flex-1 relative">
          <div className="fixed top-24 right-6 w-[35%] flex flex-col gap-6 text-right z-30">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffc7] via-[#fcaa67] to-[#da7422] ${playfair.className}`}
            >
              {project.title}
            </h1>

            <p
              className={`text-[#ffffc7]/90 text-lg md:text-xl leading-relaxed ${montserrat.className}`}
            >
              {project.description}
            </p>

            <div className="flex flex-col gap-2 font-semibold text-lg md:text-xl text-[#fcaa67]">
              <span>
                <strong>Location:</strong> {project.location}
              </span>
              <span>
                <strong>Year:</strong> {project.year}
              </span>
              <span>
                <strong>Client:</strong> {project.client}
              </span>
              <span>
                <strong>Status:</strong> {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Добавляем отступ снизу, чтобы текст не перекрывался */}
      <div className="h-[600px]" />
    </section>
  );
}
