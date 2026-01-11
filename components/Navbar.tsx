"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  TargetAndTransition,
  Variants,
  Transition,
} from "framer-motion";
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
  const [arrowVisible, setArrowVisible] = useState(true);

  // Анимация для картинок
  const hoverMotion = (
    active: boolean,
    hiddenX: number
  ): TargetAndTransition => ({
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

  // Анимация букв с лёгким отскоком
  const letterTransition: Transition = {
    type: "spring",
    stiffness: 140,
    damping: 15,
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: -50, rotate: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { ...letterTransition, delay: i * 0.03 },
    }),
  };

  // Показываем стрелку, если на верху страницы
  useEffect(() => {
    const handleScroll = () => setArrowVisible(window.scrollY < 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-visible">
      {/* Фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-[#3a3a3a] to-[#5e5e5e] z-0" />

      {/* Сетка */}
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

      {/* Главные фразы */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffc7] via-[#fcaa67] to-[#da7422] ${playfair.className} flex flex-wrap justify-center`}
        >
          {"Architektur beginnt mit einer Frage?".split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-medium text-[#ffffc7] ${montserrat.className} italic tracking-wide flex flex-wrap justify-center mt-4`}
        >
          {"Form folgt dem Denken, nicht der Gewohnheit."
            .split("")
            .map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </h2>
      </div>

      {/* 🔽 Стрелка вниз */}
      <motion.div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center cursor-pointer ${
          arrowVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: arrowVisible ? 1 : 0,
          y: arrowVisible ? [0, 6, 0] : 0,
        }}
        transition={{ repeat: arrowVisible ? Infinity : 0, duration: 0.8 }}
        onClick={() => {
          const el = document.getElementById("projekt-2");
          if (!el) return;
          const offset = el.getBoundingClientRect().top + window.scrollY + 130;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }}
      >
        <span className="text-[#fcaa67] text-sm md:text-base font-semibold mb-1">
          Die neuesten Projekte
        </span>
        <motion.svg
          className="w-8 h-8 text-[#fcaa67]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.div>

      {/* Проекты */}
      {sections.map((sec, i) => {
        const isRight = sec.align === "right";
        const hiddenX = isRight ? 500 : -500;

        return (
          <div
            key={sec.id}
            id={sec.id}
            className="relative z-20 w-full h-[900px] mt-20 overflow-visible"
          >
            {/* Картинка */}
            <div
              className={`absolute top-1/4 ${
                isRight ? "right-0 w-[65%]" : "left-0 w-[65%]"
              }`}
            >
              <motion.div
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={sec.onClick}
                className="relative w-full h-[65vh] cursor-pointer rounded-xl overflow-hidden shadow-lg border-2 border-[#fcaa67]/70"
                initial={{ x: hiddenX, opacity: 0.6 }}
                animate={hoverMotion(hoverIndex === i, hiddenX)}
              >
                <Image
                  src={sec.img}
                  alt={sec.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1200px) 100vw, 70vw"
                />
                {/* Подсказка при наведении */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 text-[#fcaa67] text-lg md:text-xl font-semibold pointer-events-none rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoverIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Klicke hier
                </motion.div>
              </motion.div>
            </div>

            {/* Текст */}
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
