"use client";

import React from "react";
import { Plus, Edit2, Pause, Trash2, Monitor, Smartphone, Cpu } from "lucide-react";

export default function ServicesManager() {
  const services = [
    { name: "Formatação Windows 11", category: "Software", price: "R$ 150", time: "3h", type: "presencial", active: true, icon: Monitor },
    { name: "Troca de Tela iPhone 13", category: "Hardware", price: "R$ 850", time: "1h", type: "presencial", active: true, icon: Smartphone },
    { name: "Upgrade SSD 480GB", category: "Hardware", price: "R$ 350", time: "2h", type: "presencial", active: true, icon: Cpu },
    { name: "Limpeza Preventiva", category: "Hardware", price: "R$ 120", time: "2h", type: "presencial", active: false, icon: Monitor },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-gray shadow-sm p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-dark tracking-tighter">Serviços Oferecidos</h3>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-dark font-bold text-xs rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Plus size={16} />
          Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {services.map((service, i) => (
          <div key={i} className={`p-5 rounded-2xl border transition-all ${service.active ? "bg-white border-gray hover:border-primary/30" : "bg-gray/10 border-transparent opacity-60"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.active ? "bg-primary/10 text-primary" : "bg-gray text-dark/30"}`}>
                  <service.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm">{service.name}</h4>
                  <p className="text-[10px] font-extrabold text-dark/40 uppercase tracking-wider">{service.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-black text-dark">{service.price}</p>
                <p className="text-[10px] font-bold text-dark/40 italic">Média {service.time}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray/50 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${service.active ? "bg-emerald-500" : "bg-gray-400"}`} />
                <span className="text-[10px] font-bold text-dark/50 uppercase">{service.active ? "Ativo" : "Pausado"}</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-dark/40 hover:text-dark hover:bg-gray rounded-lg transition-all"><Edit2 size={14} /></button>
                <button className="p-2 text-dark/40 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"><Pause size={14} /></button>
                <button className="p-2 text-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
