"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

export default function CompletionCard() {
  const steps = [
    { label: "Adicionar logo", done: true },
    { label: "Definir horários", done: true },
    { label: "Cadastrar serviços", done: false },
    { label: "Enviar certificados", done: false },
    { label: "Biografia profissional", done: true },
  ];

  const progress = 72;

  return (
    <div className="bg-dark p-8 rounded-[32px] text-white shadow-2xl shadow-dark/20 space-y-8">
      <div>
        <h3 className="text-xl font-black tracking-tighter mb-2">Seu perfil está {progress}% completo</h3>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            {step.done ? (
              <CheckCircle2 size={18} className="text-primary" />
            ) : (
              <Circle size={18} className="text-white/20" />
            )}
            <span className={`text-sm font-bold ${step.done ? "text-white" : "text-white/40"}`}>{step.label}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors">
        Completar Perfil
      </button>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <div className="text-2xl">♻️</div>
          <div>
            <p className="text-xs font-bold text-primary">Impacto Ambiental</p>
            <p className="text-[10px] text-white/60 leading-tight">Você evitou 22kg de lixo eletrônico este mês.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
