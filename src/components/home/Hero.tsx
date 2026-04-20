"use client";

import React from "react";
import { motion } from "framer-motion";
import AuthCard from "./AuthCard";

export default function Hero() {
  const pillars = [
    { icon: "💻", title: "Educação Tecnológica", desc: "Cursos gratuitos de Assistente de TI" },
    { icon: "♻️", title: "Sustentabilidade", desc: "Coleta e reaproveitamento de e-lixo" },
    { icon: "🚀", title: "Inclusão Profissional", desc: "Novas oportunidades para todos" },
  ];

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-dark leading-[0.9]">
                Transformamos vidas com <br />
                <span className="text-gradient">tecnologia,</span> <br />
                <span className="text-gradient">educação</span> e <br />
                <span className="text-gradient">sustentabilidade</span>
              </h1>
              <p className="text-xl text-dark/60 font-medium max-w-xl leading-relaxed">
                A Start Nexus capacita pessoas de todas as idades para atuar na área de tecnologia enquanto transforma lixo eletrônico em oportunidades reais.
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="bg-gray/50 border border-gray p-5 rounded-2xl hover:border-primary/30 transition-colors group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
                  <h4 className="text-xs font-extrabold text-dark uppercase tracking-wider mb-1">{p.title}</h4>
                  <p className="text-[10px] text-dark/50 font-bold leading-tight">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-dark text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-dark/20 hover:scale-105 transition-transform active:scale-95">
                Conheça a ONG
              </button>
              <button className="bg-white text-dark border border-gray px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray transition-colors active:scale-95">
                Ver Soluções
              </button>
            </div>
          </motion.div>

          {/* Right Column: Auth Modal */}
          <div className="relative">
            {/* Background elements behind card */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 animate-pulse"></div>
            <AuthCard />
          </div>
        </div>
      </div>
    </section>
  );
}
