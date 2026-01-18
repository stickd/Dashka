"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MiniGalleryProps {
  photos?: string[];
}

export default function MiniGallery({ photos = [] }: MiniGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Если нет фото, используем заглушки
  const slides = photos.length
    ? photos
    : Array.from({ length: 7 }).map((_, i) => `Фото ${i + 1}`);

  const prevSlide = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const nextSlide = () =>
    setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#cccccc] to-[#000000]">
      {/* Слайды */}
      <div className="flex items-center justify-center relative w-full h-full">
        {slides.map((slide, index) => {
          const offset = index - activeIndex;
          if (offset < -1 || offset > 1) return null; // Показываем только 3 слайда

          const scale = offset === 0 ? 1 : 0.7;
          const translateX = offset * 50; // смещение боковых слайдов
          const opacity = offset === 0 ? 1 : 0.5;
          const zIndex = offset === 0 ? 10 : 5;

          return (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] sm:w-[50%] md:w-[40%] rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => setActiveIndex(index)}
              // Анимация для плавного исчезновения
              initial={{ opacity: 0 }}
              animate={{ opacity: offset === 0 ? 1 : 0.5 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5,
              }}
            >
              {/* Заглушка */}
              <div className="w-full h-[400px] bg-gray-300 flex items-center justify-center font-semibold text-2xl text-gray-700 rounded-xl border border-gray-200">
                {slide}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Навигация */}
      <button
        onClick={prevSlide}
        disabled={activeIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black p-3 rounded-full shadow-md hover:bg-white/90 disabled:opacity-30 transition-all"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        disabled={activeIndex === slides.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black p-3 rounded-full shadow-md hover:bg-white/90 disabled:opacity-30 transition-all"
      >
        →
      </button>
    </div>
  );
}
