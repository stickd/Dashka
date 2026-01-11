"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function FooterHero() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    setStatus(null);
    if (formData.get("company")) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen overflow-hidden pt-32 pb-32 px-6 bg-black text-white flex items-center justify-center"
      style={{ scrollMarginTop: 100 }}
    >
      {/* --- Decorative blur circles --- */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FCAA67]/30 blur-[120px] rounded-full" />
      <div className="absolute top-10 left-1/3 w-36 h-36 bg-[#FCAA67]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-12 right-1/4 w-52 h-52 bg-[#FCAA67]/20 rounded-full blur-[140px]" />

      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10 w-full">
        {/* Contact info */}
        <div className="text-center space-y-3">
          <h3
            className={`text-4xl sm:text-5xl font-black ${playfair.className}`}
          >
            Daria Zgherska
          </h3>
          <p className="text-lg sm:text-xl">Email: info@gesundheit.de</p>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
          aria-live="polite"
        >
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <input
            name="name"
            required
            placeholder="Ihr Name"
            className="w-full h-14 px-4 rounded-3xl border border-white/30 bg-white/10 text-white placeholder-white text-base focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full h-14 px-4 rounded-3xl border border-white/30 bg-white/10 text-white placeholder-white text-base focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition"
          />
          <textarea
            name="message"
            required
            placeholder="Nachricht"
            rows={5}
            className="w-full p-4 rounded-3xl border border-white/30 bg-white/10 text-white placeholder-white text-base focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition resize-none"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className="w-full px-6 py-3 bg-[#FCAA67]/80 hover:bg-[#FCAA67] text-[#473335] rounded-3xl font-semibold text-lg sm:text-xl transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Senden..." : "Termin vereinbaren"}
          </motion.button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-green-200 mt-2 text-center"
              >
                ✔ Ihre Nachricht wurde erfolgreich gesendet
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-red-200 mt-2 text-center"
              >
                ❌ Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.footer>
  );
}
