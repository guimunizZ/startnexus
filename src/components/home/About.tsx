// src/components/home/About.tsx
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
      <section id="quem-somos" className="py-24 bg-surface/40 relative overflow-hidden">
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
                <h2 className="text-primary text-sm font-extrabold uppercase tracking-[0.2em]">
                  Quem Somos
                </h2>

                <h3 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.02] text-foreground">
                  Construindo o futuro com
                  <br />
                  <span className="text-gradient">
                  tecnologia e propósito
                </span>
                </h3>
              </div>

              <div className="space-y-6 text-lg text-muted leading-relaxed">
                <p>
                  A Start Nexus nasceu em São Paulo com a missão de unir
                  educação tecnológica, inclusão social e sustentabilidade.
                </p>

                <p>
                  Capacitamos pessoas para o mercado digital enquanto
                  reaproveitamos resíduos eletrônicos e geramos impacto real.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-4xl font-black text-foreground">
                        {stat.value}
                      </p>

                      <p className="text-xs uppercase tracking-widest text-muted mt-1">
                        {stat.label}
                      </p>
                    </div>
                ))}
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid gap-6"
            >
              <div className="rounded-3xl border border-white/10 bg-background p-8">
                <h4 className="text-xl font-bold text-foreground mb-3">
                  Nossa Missão
                </h4>

                <p className="text-muted leading-relaxed">
                  Promover inclusão social via educação tecnológica e economia circular.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 bg-background p-8">
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    Nossa Visão
                  </h4>

                  <p className="text-muted leading-relaxed">
                    Ser referência nacional em inovação social e formação digital.
                  </p>
                </div>

                <div className="rounded-3xl border border-primary/20 bg-gradient-brand p-8 text-white">
                  <h4 className="text-xl font-bold mb-3">
                    Valores
                  </h4>

                  <ul className="space-y-2 text-sm font-medium">
                    <li>Inclusão</li>
                    <li>Inovação</li>
                    <li>Sustentabilidade</li>
                    <li>Transparência</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
  );
}
