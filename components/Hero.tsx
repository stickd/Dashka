"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
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

interface HeroAboutProps {}

export default function HeroAbout({}: HeroAboutProps) {
  const [isHoverTop, setIsHoverTop] = useState(false);
  const [isHoverBottom, setIsHoverBottom] = useState(false);
  const [isHoverFourth, setIsHoverFourth] = useState(false);
  const [imageWidth, setImageWidth] = useState(1600);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isHoverFifth, setIsHoverFifth] = useState(false);
  const router = useRouter();

  // Авто-адаптация ширины картинки под экран
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const screenWidth = containerRef.current.offsetWidth;
      if (imageWidth < screenWidth) {
        setImageWidth(screenWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageWidth]);

  return (
    <section className="relative w-full overflow-visible" ref={containerRef}>
      {/* --- Background --- */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#473335,#548687,#B0413E)] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FCAA67]/30 blur-[120px] rounded-full" />

      {/* --- Hero Content (без кнопок) --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1
          className={`mb-4 uppercase tracking-[0.18em] text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFC7] via-[#A59132] to-[#DA7422] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] ${playfair.className}`}
        >
          Architektur, die inspiriert
        </h1>

        <div className="w-36 h-[3px] bg-[#FCAA67] mb-10 shadow-[0_0_20px_#FCAA67]" />

        <p
          className={`text-[#FFFFC7]/90 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${montserrat.className}`}
        >
          Wir erschaffen moderne Räume mit Charakter – Wärme, Stil und
          Innovation in jedem Projekt.
        </p>
      </div>

      {/* --- Bottom About Section (3.jpg) --- */}
      <div
        ref={aboutRef}
        id="about"
        className="relative z-10 w-full h-[900px] mt-12 overflow-visible"
      >
        <div className="absolute top-1/4 right-0 w-[65%] h-full overflow-hidden">
          <motion.div
            onMouseEnter={() => setIsHoverBottom(true)}
            onMouseLeave={() => setIsHoverBottom(false)}
            onClick={() => router.push("/page2")} // <-- правильно!
            initial={{ x: 600, opacity: 0.6, scale: 1 }}
            animate={{
              x: isHoverBottom ? 0 : 600,
              opacity: isHoverBottom ? 1 : 0.6,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
            className="absolute top-0 right-0 w-full h-full cursor-pointer"
          >
            <Image
              src="/3.jpg"
              alt="Projekt Bild"
              fill
              className="object-cover w-full h-full pointer-events-none"
              style={{ objectPosition: "center" }}
              priority
            />
          </motion.div>
        </div>

        <div className="absolute top-1/4 left-0 w-[35%] flex flex-col px-4 md:px-8">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] uppercase tracking-[0.05em] ${playfair.className} text-[#FCAA67] mix-blend-difference`}
          >
            Нові Проекти
          </h2>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Typ / Modul:</span>{" "}
            Städtebau · Projekt 2
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Zeitraum:</span>{" "}
            Sommer 2025
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Ort:</span>{" "}
            Koblenz-Lützel
          </p>

          <p className="text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">
              Ziel & Konzept:
            </span>{" "}
            Funktional gegliedertes Gebäude für Wohnen und Gesundheit.
            Erdgeschoss: Apotheke und Eingangspraxis; 1. OG: Praxen und Labor;
            ab 2. OG: barrierefreie Wohnungen, reguläre Wohnungen, Maisonette.
            Gestufte Kubatur, Holzfassade, Glasbausteine, begrünte Balkone.
            Klare Wegeführung, kurze Wege, angenehme Aufenthaltsqualität.
          </p>
        </div>
      </div>

      {/* --- Fourth Section (4.png) --- */}
      <div className="relative z-10 w-full h-[900px] mt-12">
        <motion.div
          onMouseEnter={() => setIsHoverFourth(true)}
          onMouseLeave={() => setIsHoverFourth(false)}
          initial={{ left: -imageWidth / 3, scale: 0.8, opacity: 0.6 }}
          animate={{
            left: isHoverFourth
              ? Math.min(
                  0,
                  (containerRef.current?.offsetWidth || 0) - imageWidth - 250
                )
              : -imageWidth / 3,
            scale: 0.8,
            opacity: isHoverFourth ? 1 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
          className="absolute top-1/4 cursor-pointer"
          style={{
            width: imageWidth,
            height: "60vh",
          }}
        >
          <Image
            src="/4.png"
            alt="Projekt Bild 4"
            width={imageWidth}
            height={800}
            className="object-contain pointer-events-none"
            style={{ objectPosition: "left center" }}
            priority
          />
        </motion.div>

        <div className="absolute top-1/4 right-0 w-[35%] flex flex-col px-4 md:px-8">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 uppercase tracking-[0.05em] ${playfair.className} text-[#FCAA67] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mix-blend-difference`}
          >
            Bendorf+
          </h2>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Typ / Modul:</span>{" "}
            Städtebau · Projekt 1
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Zeitraum:</span>{" "}
            Sommer 2025
          </p>

          <p className="text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">
              Ziel & Konzept:
            </span>{" "}
            Analyse und Weiterentwicklung eines Wohnquartiers. Nutzung der
            vorhandenen Infrastruktur, Verbesserung von Freiräumen und
            funktionaler Vielfalt. Auflösung von Barrieren und Transformation
            untergenutzter Flächen.
          </p>
        </div>
      </div>

      {/* --- Fifth Section (5.jpg) --- */}
      <div className="relative z-10 w-full h-[950px] mt-12 overflow-visible">
        <div className="absolute top-0 right-0 h-[120vh] w-[90%] overflow-visible">
          <motion.div
            onMouseEnter={() => setIsHoverFifth(true)}
            onMouseLeave={() => setIsHoverFifth(false)}
            initial={{ x: 300, opacity: 0.6, scale: 1 }}
            animate={{
              x: isHoverFifth ? 0 : 300,
              opacity: isHoverFifth ? 1 : 0.6,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
            className="absolute top-0 right-0 w-full h-full cursor-pointer"
          >
            <Image
              src="/5.jpg"
              alt="Projekt Bild 5"
              fill
              className="object-contain pointer-events-none"
              style={{ objectPosition: "center" }}
              priority
            />
          </motion.div>
        </div>

        <div className="absolute top-1/4 left-0 w-[35%] flex flex-col px-4 md:px-8">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] uppercase tracking-[0.05em] ${playfair.className} text-[#FCAA67] mix-blend-difference`}
          >
            Новий Проект
          </h2>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Typ / Modul:</span>{" "}
            Städtebau · Projekt 3
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Zeitraum:</span>{" "}
            Sommer 2025
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Ort:</span>{" "}
            Koblenz-Lützel
          </p>

          <p className="text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">
              Ziel & Konzept:
            </span>{" "}
            Funktional gegliedertes Gebäude für Wohnen und Gesundheit.
            Erdgeschoss: Apotheke und Eingangspraxis; 1. OG: Praxen und Labor;
            ab 2. OG: barrierefreie Wohnungen, reguläre Wohnungen, Maisonette.
            Gestufte Kubatur, Holzfassade, Glasbausteine, begrünte Balkone.
            Klare Wegeführung, kurze Wege, angenehme Aufenthaltsqualität.
          </p>
        </div>
      </div>

      {/* --- Top About Section (2.jpg) --- */}
      {/* --- Top About Section (2.jpg) --- */}
      <div
        ref={aboutRef}
        id="about"
        className="relative z-10 w-full mt-12 flex justify-center" // flex центрирует картинку
      >
        <motion.div
          onMouseEnter={() => setIsHoverTop(true)}
          onMouseLeave={() => setIsHoverTop(false)}
          initial={{ x: -imageWidth / 3, scale: 1, opacity: 0.8 }}
          animate={{
            x: isHoverTop
              ? Math.min(
                  0,
                  (containerRef.current?.offsetWidth || 0) - imageWidth - 200
                )
              : -imageWidth / 3,
            scale: 1,
            opacity: isHoverTop ? 1 : 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
          className="relative cursor-pointer" // убрали absolute
          style={{
            width: imageWidth,
            height: imageWidth * 0.5, // делаем картинку "тоньше", например половина ширины
            maxWidth: "100%", // чтобы не выходила за экран
            overflow: "visible",
          }}
        >
          <Image
            src="/2.jpg"
            alt="Projekt Bild"
            fill
            className="object-contain pointer-events-none" // object-contain = полностью видно
            style={{ objectPosition: "center" }}
            priority
          />
        </motion.div>

        <div className="absolute top-1/4 right-0 w-[35%] flex flex-col px-4 md:px-8">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 uppercase tracking-[0.05em] ${playfair.className} text-[#FCAA67] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mix-blend-difference`}
          >
            Bendorf+
          </h2>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Typ / Modul:</span>{" "}
            Städtebau · Projekt 1
          </p>

          <p className="mb-4 text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">Zeitraum:</span>{" "}
            Sommer 2025
          </p>

          <p className="text-lg md:text-xl leading-relaxed mix-blend-difference">
            <span className="text-[#FCAA67] font-semibold">
              Ziel & Konzept:
            </span>{" "}
            Analyse und Weiterentwicklung eines Wohnquartiers. Nutzung der
            vorhandenen Infrastruktur, Verbesserung von Freiräumen und
            funktionaler Vielfalt. Auflösung von Barrieren und Transformation
            untergenutzter Flächen.
          </p>
        </div>
      </div>
    </section>
  );
}
