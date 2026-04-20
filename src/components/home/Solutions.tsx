"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Solutions() {
  const solutions = [
    {
      id: 1,
      title: "Marketplace Solidário",
      desc: "Espaço dedicado para a venda e doação de equipamentos eletrônicos recuperados em nossas aulas práticas.",
      icon: "🛒",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Coleta de E-lixo",
      desc: "Pontos de descarte inteligente espalhados por São Paulo para garantir o destino correto de resíduos eletrônicos.",
      icon: "♻️",
      color: "bg-emerald-500",
    },
    {
      id: 3,
      title: "Educação em TI",
      desc: "Cursos gratuitos de hardware, redes e suporte técnico, focados na reinserção profissional de jovens e adultos.",
      icon: "🎓",
      color: "bg-purple-500",
    },
  ];

  return (
    <section id="solucoes" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-extrabold uppercase tracking-[0.2em]"
          >
            Soluções
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-dark tracking-tighter"
          >
            Como transformamos <span className="text-gradient">o mundo</span>
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group bg-gray/30 p-10 rounded-[40px] border border-gray hover:bg-white hover:shadow-2xl hover:shadow-dark/5 hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`w-16 h-16 ${solution.color} rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {solution.icon}
              </div>
              <h4 className="text-2xl font-extrabold text-dark mb-4 tracking-tight">{solution.title}</h4>
              <p className="text-dark/60 font-medium leading-relaxed">
                {solution.desc}
              </p>
              <div className="mt-8 pt-8 border-t border-gray/50 flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                Saber mais <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
