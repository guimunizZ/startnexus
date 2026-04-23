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
    },
    {
      client: "Maria Oliveira",
      service: "Formatação + Backup",
      bairro: "Granja Viana",
      urgency: "medium",
      date: "23 Abr - 09:30",
    },
    {
      client: "João Santos",
      service: "Upgrade SSD 480GB",
      bairro: "Caucaia",
      urgency: "low",
      date: "23 Abr - 11:00",
    },
  ];

  const urgencyColors = {
    high: "bg-red-50 text-red-600 border-red-200",
    medium: "bg-orange-50 text-orange-600 border-orange-200",
    low: "bg-blue-50 text-blue-600 border-blue-200",
  };

  return (
      <div className="bg-white rounded-[32px] border border-[rgba(255,255,255,0.08)] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter">
            Pedidos Recebidos
          </h3>

          <button className="text-xs font-extrabold text-primary uppercase tracking-widest hover:underline">
            Ver todos
          </button>
        </div>

        <div className="divide-y divide-slate-200">
          {orders.map((order, i) => (
              <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-slate-900">{order.client}</h4>

                      <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              urgencyColors[
                                  order.urgency as keyof typeof urgencyColors
                                  ]
                          }`}
                      >
                    {order.urgency.toUpperCase()}
                  </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600">
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
                    <button className="px-6 py-2.5 bg-primary text-slate-900 font-bold text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                      Aceitar
                    </button>

                    <button className="px-6 py-2.5 bg-white text-slate-900 border border-slate-200 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors">
                      Negociar
                    </button>

                    <button className="px-6 py-2.5 text-slate-500 font-bold text-xs hover:text-red-500 transition-colors">
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
