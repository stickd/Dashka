"use client";

import React from "react";
import Hero from "../components/Hero";
import MiniGalery from "../components/MiniGalery"; // подключаем мини-галерею
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero секция */}
      <section id="hero" className="min-h-screen relative">
        <Hero />
      </section>

      {/* Мини-галерея после Hero */}
      <section id="gallery" className="relative">
        <MiniGalery />
      </section>

      {/* Footer с контактами */}
      <Footer />
    </main>
  );
}
