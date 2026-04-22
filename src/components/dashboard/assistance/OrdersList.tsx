"use client";

import React from "react";
import { Clock, MapPin, AlertCircle } from "lucide-react";

export default function OrdersList() {
  const orders = [
    { 
      client: "Guilherme Silva", 
      service: "Troca de Tela Notebook", 
      bairro: "Centro, Cotia", 
      urgency: "high", 
      date: "22 Abr - 14:00",
      status: "pending"
    },
    { 
      client: "Maria Oliveira", 
      service: "Formatação + Backup", 
      bairro: "Granja Viana", 
      urgency: "medium", 
      date: "23 Abr - 09:30",
      status: "pending"
    },
    { 
      client: "João Santos", 
      service: "Upgrade SSD 480GB", 
      bairro: "Caucaia", 
      urgency: "low", 
      date: "23 Abr - 11:00",
      status: "pending"
    },
  ];

  const urgencyColors = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-orange-50 text-orange-600 border-orange-100",
    low: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray flex items-center justify-between">
        <h3 className="text-xl font-black text-dark tracking-tighter">Pedidos Recebidos</h3>
        <button className="text-xs font-extrabold text-primary uppercase tracking-widest hover:underline">Ver todos</button>
      </div>

      <div className="divide-y divide-gray">
        {orders.map((order, i) => (
          <div key={i} className="p-6 hover:bg-gray/20 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-dark">{order.client}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${urgencyColors[order.urgency as keyof typeof urgencyColors]}`}>
                    {order.urgency.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-dark/50">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{order.bairro}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>{order.service}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 lg:flex-none px-6 py-2.5 bg-primary text-dark font-bold text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Aceitar
                </button>
                <button className="flex-1 lg:flex-none px-6 py-2.5 bg-white text-dark border border-gray font-bold text-xs rounded-xl hover:bg-gray transition-colors">
                  Negociar
                </button>
                <button className="flex-1 lg:flex-none px-6 py-2.5 text-dark/40 font-bold text-xs hover:text-red-500 transition-colors">
                  Recusar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
