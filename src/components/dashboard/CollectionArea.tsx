"use client";

import React, { useState } from "react";

export default function CollectionArea() {
  const [activeTab, setActiveTab] = useState<"new" | "history" | "points">("new");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/50">
        <button
          onClick={() => setActiveTab("new")}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === "new" ? "text-emerald-500 border-b-2 border-emerald-500 bg-emerald-500/5" : "text-slate-500 hover:text-slate-300"}`}
        >
          ♻️ Nova Coleta
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === "history" ? "text-emerald-500 border-b-2 border-emerald-500 bg-emerald-500/5" : "text-slate-500 hover:text-slate-300"}`}
        >
          📜 Histórico
        </button>
        <button
          onClick={() => setActiveTab("points")}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === "points" ? "text-emerald-500 border-b-2 border-emerald-500 bg-emerald-500/5" : "text-slate-500 hover:text-slate-300"}`}
        >
          💎 Pontos Nexus
        </button>
      </div>

      <div className="p-8">
        {activeTab === "new" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Solicitar Descarte Ecológico</h3>
              <p className="text-slate-400 text-sm">Agende a retirada de seus resíduos eletrônicos e ganhe pontos.</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tipo de Resíduo</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors">
                  <option>Smartphone / Tablet</option>
                  <option>Notebook / Computador</option>
                  <option>Periféricos (Mouse, Teclado)</option>
                  <option>Eletrodomésticos Pequenos</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Descrição Opcional</label>
                <textarea
                  placeholder="Ex: Notebook antigo com bateria inchada"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors h-24 resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Minhas Coletas</h3>
              <p className="text-slate-400 text-sm">Acompanhe o status das suas solicitações.</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "1", date: "15/04/2026", status: "Concluído", item: "Smartphone" },
                { id: "2", date: "10/04/2026", status: "Em Rota", item: "Monitor LCD" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div>
                    <p className="text-white font-bold">{item.item}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === "Concluído" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "points" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl text-center shadow-xl shadow-emerald-900/20">
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-2">Saldo Atual</p>
              <h2 className="text-5xl font-extrabold text-white mb-4">450 <span className="text-2xl font-normal opacity-70">pts</span></h2>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[45%]"></div>
              </div>
              <p className="text-emerald-100 text-xs mt-3">Faltam 550 pts para o próximo nível (Eco Master)</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm">Benefícios Disponíveis</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 opacity-50">
                  <p className="text-white font-bold text-sm">10% Off Reparo</p>
                  <p className="text-[10px] text-slate-500">Custa 1000 pts</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 opacity-50">
                  <p className="text-white font-bold text-sm">Selo Eco-Friend</p>
                  <p className="text-[10px] text-slate-500">Custa 500 pts</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
