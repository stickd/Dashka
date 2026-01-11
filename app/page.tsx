"use client";

import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // подключаем футер

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero секция */}
      <section id="hero" className="min-h-screen relative">
        <Hero />
      </section>

      {/* Footer с контактами */}
      <Footer />
    </main>
  );
}
