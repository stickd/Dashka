"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "../../components/Navbar"; // Навигация

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
    <section className="relative w-full min-h-screen bg-[linear-gradient(120deg,#473335,#548687,#B0413E)] text-white overflow-hidden">
      {/* Навигационная панель */}
      <Navbar />

      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        {/* Галерея слева */}
        <div className="flex-1 flex flex-col gap-6">
          {project.images.map((src, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 90 }}
              className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer shadow-lg"
            >
              <Image
                src={src}
                alt={`${project.title} ${idx + 1}`}
                fill
                className="object-cover pointer-events-none"
                priority={idx === 0}
              />
              {hoveredIndex === idx && (
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white text-lg font-semibold">
                  View Image
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Текст справа */}
        <div className="flex-1">
          <div className="fixed top-24 right-6 w-[35%] flex flex-col text-right z-20">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-[0.05em] bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFC7] via-[#A59132] to-[#DA7422] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] ${playfair.className}`}
            >
              {project.title}
            </h1>

            <p
              className={`text-[#FFFFC7]/90 text-lg md:text-xl mb-6 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${montserrat.className}`}
            >
              {project.description}
            </p>

            <div className="flex flex-col gap-2 font-semibold text-lg md:text-xl mix-blend-difference text-[#FCAA67]">
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
    </section>
  );
}
