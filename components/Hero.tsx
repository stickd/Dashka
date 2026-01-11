"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function HeroAbout() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const hoverMotion = (active: boolean, hiddenX: number) => ({
    x: active ? 0 : hiddenX,
    opacity: active ? 1 : 0.65,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 18 },
  });

  const sections = [
    {
      id: "projekt-2",
      title: "Нові Проекти",
      img: "/3.jpg",
      align: "right",
      onClick: () => router.push("/page2"),
    },
    { id: "bendorf", title: "Bendorf+", img: "/4.png", align: "left" },
    { id: "projekt-3", title: "Новий Проект", img: "/5.jpg", align: "right" },
  ];

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* Фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e] z-0" />

      {/* Бледная оранжевая сетка сверху */}
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

      {/* Лицевые фразы */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="flex flex-col gap-6">
          {/* Основной заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffc7] via-[#fcaa67] to-[#da7422] ${playfair.className}`}
          >
            Architektur beginnt mit einer Frage.
          </motion.h1>

          {/* Подзаголовок */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-medium text-[#ffffc7] ${montserrat.className} italic tracking-wide`}
          >
            Form folgt dem Denken, nicht der Gewohnheit.
          </motion.h2>
        </div>
      </div>

      {/* PROJECTS */}
      {sections.map((sec, i) => {
        const isRight = sec.align === "right";
        const hiddenX = isRight ? 500 : -500;

        return (
          <div
            key={sec.id}
            className="relative z-20 w-full h-[900px] mt-20 overflow-visible"
          >
            {/* IMAGE */}
            <div
              className={`absolute top-1/4 ${
                isRight ? "right-0 w-[65%]" : "left-0 w-[65%]"
              }`}
            >
              <motion.div
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={sec.onClick}
                className="relative w-full h-[65vh] cursor-pointer"
                initial={{ x: hiddenX, opacity: 0.6 }}
                animate={hoverMotion(hoverIndex === i, hiddenX)}
              >
                <Image
                  src={sec.img}
                  alt={sec.title}
                  fill
                  className="object-cover rounded-xl border-2 border-[#fcaa67]/70 shadow-lg"
                  loading="lazy"
                  sizes="(max-width: 1200px) 100vw, 70vw"
                />
              </motion.div>
            </div>

            {/* TEXT */}
            <div
              className={`absolute top-1/4 ${
                isRight ? "left-0" : "right-0"
              } w-[35%] px-6`}
            >
              <h3
                className={`text-5xl font-bold mb-6 uppercase text-[#fcaa67] ${playfair.className}`}
              >
                {sec.title}
              </h3>

              <p className="text-lg md:text-xl text-[#ffffc7] leading-relaxed">
                Städtebau · Projekt
              </p>
              <p className="text-lg md:text-xl text-[#ffffc7] leading-relaxed">
                Sommer 2025
              </p>
              <p className="text-lg md:text-xl text-[#ffffc7] leading-relaxed">
                Koblenz-Lützel
              </p>

              <p className="text-lg md:text-xl mt-4 text-[#ffffc7] leading-relaxed">
                Funktional gegliedertes Gebäude. Wohnen, Praxis, Labor,
                barrierefreie Wohnungen, Holzfassade, Glasbausteine,
                Grünflächen.
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
