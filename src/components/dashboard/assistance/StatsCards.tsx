"use client";

import React from "react";
import {
  ShoppingBag,
  Calendar,
  CheckCircle2,
  DollarSign,
  Recycle,
} from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      label: "Pedidos Recebidos",
      value: "4",
      sub: "Hoje",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Agendamentos",
      value: "2",
      sub: "Confirmados",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Serviços Concluídos",
      value: "1",
      sub: "Hoje",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Faturamento Mês",
      value: "R$ 2.450",
      sub: "17 atendimentos",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Coletas Realizadas",
      value: "9",
      sub: "Lixo eletrônico",
      icon: Recycle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pontos Nexus",
      value: "120",
      sub: "🌱 Impacto Social",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
              <div
                  key={i}
                  className="bg-white rounded-[32px] border border-[rgba(255,255,255,0.08)] shadow-sm p-7 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bg}`}
                  >
                    <stat.icon className={stat.color} size={28} />
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                      {stat.label}
                    </p>

                    <h3 className="mt-1 text-5xl font-black text-slate-900 leading-none">
                      {stat.value}
                    </h3>
                  </div>
                </div>

                <p className="mt-6 text-base font-semibold text-slate-500">
                  {stat.sub}
                </p>
              </div>
          ))}
        </div>
      </div>
  );
}
