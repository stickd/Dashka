"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
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
  const [arrowVisible, setArrowVisible] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById("projekt-2");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      // Стрелка видна только если верх блока ниже нижней границы экрана
      setArrowVisible(rect.top > 0);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Проверяем сразу при загрузке страницы
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

      {/* HERO */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffc7] via-[#fcaa67] to-[#da7422] ${playfair.className} flex flex-wrap justify-center`}
        >
          {"Architektur beginnt mit einer Frage?".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: i * 0.03,
                type: "spring",
                stiffness: 140,
                damping: 15,
              }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.02,
                  type: "spring",
                  stiffness: 140,
                  damping: 15,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </h2>
      </div>

      {/* Стрелка вниз */}
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
        const hiddenX = isRight ? 300 : -300;

        return (
          <div
            key={sec.id}
            id={sec.id}
            className="relative z-20 w-full h-[900px] mt-20 overflow-visible invert-block"
          >
            {/* Картинка */}
            <motion.div
              className={`absolute top-1/4 ${
                isRight ? "right-0 w-[65%]" : "left-0 w-[65%]"
              } invert-block`}
              initial={{ x: hiddenX, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              <div
                className="relative w-full h-[65vh] cursor-pointer rounded-xl overflow-hidden shadow-lg border-2 border-[#fcaa67]/70"
                onClick={sec.onClick}
              >
                <Image
                  src={sec.img}
                  alt={sec.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Текст */}
            <motion.div
              className={`absolute top-1/4 ${
                isRight ? "left-0" : "right-0"
              } w-[35%] px-6`}
              initial={{ x: isRight ? -200 : 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 60, damping: 22 }}
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
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
