"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutHover, setIsAboutHover] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // Текущий путь

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Функция для перехода и скролла
  const handleClick = (id: string) => {
    if (pathname !== "/") {
      // Если мы на другой странице, переходим на главную с query параметром
      router.push(`/?scrollTo=${id}`);
    } else {
      // Если мы на главной, просто скроллим
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Логотип */}
        <div className="text-[#FCAA67] font-bold text-xl">YnrY</div>

        {/* Ссылки */}
        <div className="flex items-center gap-6 relative">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="text-white uppercase tracking-wide hover:text-[#FCAA67] transition"
            >
              {link.name}
            </button>
          ))}

          <div className="w-px h-6 bg-[#FCAA67]/70 mx-3" />

          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutHover(true)}
            onMouseLeave={() => setIsAboutHover(false)}
          >
            <button className="text-white uppercase tracking-wide hover:text-[#FCAA67] transition">
              About
            </button>

            <AnimatePresence>
              {isAboutHover && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg shadow-lg flex flex-col py-2 z-50"
                >
                  {aboutItems.map((item) => (
                    <React.Fragment key={item.id}>
                      {item.name === "Kontakt" && (
                        <div className="border-t border-[#FCAA67]/50 my-1" />
                      )}
                      <button
                        onClick={() => handleClick(item.id)}
                        className="text-white px-4 py-2 text-left hover:bg-[#FCAA67]/20 transition"
                      >
                        {item.name}
                      </button>
                    </React.Fragment>
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
