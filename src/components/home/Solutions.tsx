// src/components/home/Solutions.tsx
"use client";

import { motion } from "framer-motion";

export default function Solutions() {
  const items = [
    {
      title: "Marketplace Solidário",
      desc: "Venda e doação de eletrônicos recuperados em aulas práticas.",
      icon: "🛒",
    },
    {
      title: "Coleta de E-lixo",
      desc: "Pontos inteligentes para descarte correto de resíduos eletrônicos.",
      icon: "♻️",
    },
    {
      title: "Educação em TI",
      desc: "Cursos gratuitos de hardware, redes e suporte técnico.",
      icon: "🎓",
    },
  ];

  return (
      <section id="solucoes" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Soluções
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Como transformamos{" "}
              <span className="text-gradient">o mundo</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {items.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                    className="rounded-3xl border border-white/10 bg-surface p-7 hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-5">{item.icon}</div>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-muted leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}