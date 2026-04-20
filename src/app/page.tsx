"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Solutions from "@/components/home/Solutions";

export default function HomePage() {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <section id="inicio">
            <Hero />
          </section>

          <section id="quem-somos">
            <About />
          </section>

          <section id="solucoes">
            <Solutions />
          </section>

          <section
              id="marketplace-preview"
              className="py-24 bg-gray/30"
          >
            <div className="max-w-7xl mx-auto px-6 text-center">
              Marketplace
            </div>
          </section>
        </main>
      </div>
  );
}