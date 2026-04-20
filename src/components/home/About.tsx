"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { label: "Voluntários Ativos", value: "40+" },
    { label: "Projetos Sociais", value: "10+" },
    { label: "E-lixo Reciclado", value: "2t+" },
    { label: "Vidas Impactadas", value: "500+" },
  ];

  return (
    <section id="quem-somos" className="py-24 bg-gray/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-primary text-sm font-extrabold uppercase tracking-[0.2em]">Quem Somos</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tighter leading-tight">
                Construindo o futuro com <br />
                <span className="text-gradient">tecnologia e propósito</span>
              </h3>
            </div>

            <div className="space-y-6 text-lg text-dark/70 font-medium leading-relaxed">
              <p>
                A Start Nexus nasceu em São Paulo com a missão de unir educação tecnológica, inclusão social e sustentabilidade ambiental.
              </p>
              <p>
                Atendemos jovens, adultos e idosos que desejam ingressar no mercado digital por meio de cursos acessíveis. Enquanto capacitamos pessoas, também transformamos lixo eletrônico em ferramentas de aprendizagem e recursos para o bem social.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-4xl font-extrabold text-dark tracking-tighter">{stat.value}</p>
                  <p className="text-xs font-bold text-dark/40 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-6"
          >
            {/* Mission, Vision, Values Cards */}
            <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-dark/5 border border-gray hover:border-primary/20 transition-all duration-500 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h4 className="text-xl font-extrabold text-dark mb-3">Nossa Missão</h4>
              <p className="text-dark/60 font-medium text-sm leading-relaxed">
                Promover a inclusão social via educação tecnológica de qualidade e o reaproveitamento inteligente de resíduos eletrônicos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-dark/5 border border-gray hover:border-secondary/20 transition-all duration-500 group">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">👁️</div>
                <h4 className="text-xl font-extrabold text-dark mb-3">Nossa Visão</h4>
                <p className="text-dark/60 font-medium text-sm leading-relaxed">
                  Ser referência nacional em formação tecnológica inclusiva e economia circular até 2028.
                </p>
              </div>
              <div className="bg-dark p-8 rounded-[32px] shadow-2xl shadow-dark/20 border border-dark group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">💎</div>
                <h4 className="text-xl font-extrabold text-white mb-3">Nossos Valores</h4>
                <ul className="text-white/60 font-bold text-[10px] uppercase tracking-widest grid grid-cols-2 gap-2">
                  <li>• Inclusão</li>
                  <li>• Sustentabilidade</li>
                  <li>• Inovação</li>
                  <li>• Transparência</li>
                  <li>• Colaboração</li>
                  <li>• Empoderamento</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
