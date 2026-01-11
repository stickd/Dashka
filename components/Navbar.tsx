"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar() {
  const [isAboutHover, setIsAboutHover] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Home", id: "hero" },
    { name: "Projekte", id: "projects" },
    { name: "Galerie", id: "galerie" },
    { name: "Fotografie", id: "fotografie" },
  ];

  const aboutItems = [
    { name: "Lebenslauf", id: "lebenslauf" },
    { name: "Kunsttreff", id: "kunsttreff" },
    { name: "Kontakt", id: "footer" },
  ];

  const handleClick = (id: string) => {
    if (pathname !== "/") {
      router.push(`/?scrollTo=${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    if (id === "footer") {
      const scrollPos = el.offsetTop + el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-center">
      <div className="max-w-7xl w-full flex justify-between items-center">
        {/* Логотип как кнопка Home */}
        <button
          onClick={() => handleClick("hero")}
          className={`text-3xl font-extrabold uppercase tracking-widest text-[#FCAA67] ${playfair.className} mix-blend-difference transition-all hover:scale-110`}
        >
          YnrY
        </button>

        {/* Навигация */}
        <div
          className={`flex items-center gap-8 uppercase font-bold text-lg ${montserrat.className}`}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="transition-all duration-200 mix-blend-difference hover:scale-110"
            >
              {link.name}
            </button>
          ))}

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutHover(true)}
            onMouseLeave={() => setIsAboutHover(false)}
          >
            <button className="transition-all duration-200 mix-blend-difference hover:scale-110">
              About
            </button>

            <AnimatePresence>
              {isAboutHover && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 flex flex-col gap-1"
                >
                  {aboutItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className="px-4 py-1 transition-all duration-200 mix-blend-difference hover:scale-105"
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
