"use client";

import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <-- импортируем футер

export default function HomePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar onScroll={scrollTo} />
      {/* Hero секция */}
      <section id="hero" className="min-h-screen relative">
        <Hero onScroll={scrollTo} />
      </section>
      {/* Footer с контактами */}
      <Footer /> {/* <-- подключаем футер */}
    </main>
  );
}
