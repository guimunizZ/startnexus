"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Solutions from "@/components/home/Solutions";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Solutions />
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-dark py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xl font-extrabold text-white tracking-tighter">START NEXUS</span>
            <span className="text-[10px] font-bold text-gradient uppercase tracking-[0.3em]">Educação • Tecnologia • Sustentabilidade</span>
          </div>
          <p className="text-white/40 text-xs font-medium">
            © 2026 Start Nexus ONG. São Paulo, Brasil. Promovendo a economia circular.
          </p>
        </div>
      </footer>
    </div>
  );
}
