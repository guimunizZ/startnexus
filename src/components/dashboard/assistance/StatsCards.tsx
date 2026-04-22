"use client";

import React from "react";
import { 
  ShoppingBag, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Recycle 
} from "lucide-react";

export default function StatsCards() {
  const stats = [
    { label: "Pedidos Recebidos", value: "4", sub: "Hoje", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Agendamentos", value: "2", sub: "Confirmados", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Serviços Concluídos", value: "1", sub: "Hoje", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Faturamento Mês", value: "R$ 2.450", sub: "17 atendimentos", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
    { label: "Coletas Realizadas", value: "9", sub: "Lixo eletrônico", icon: Recycle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pontos Nexus", value: "120", sub: "🌱 Impacto Social", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[32px] border border-gray shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-extrabold text-dark/40 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-dark tracking-tighter">{stat.value}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-dark/60">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
