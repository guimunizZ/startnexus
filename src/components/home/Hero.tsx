// src/components/home/Hero.tsx
"use client";

import AuthCard from "./AuthCard";

export default function Hero() {
  return (
      <section id="inicio" className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-foreground">
              Transformamos vidas com
              <br />
              <span className="text-gradient">tecnologia,</span>
              <br />
              <span className="text-gradient">educação</span> e
              <br />
              <span className="text-gradient">sustentabilidade</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg md:text-xl text-muted leading-relaxed">
              Capacitamos jovens, adultos e idosos para o mercado digital
              enquanto transformamos lixo eletrônico em oportunidades reais.
            </p>
          </div>

          <AuthCard />
        </div>
      </section>
  );
}