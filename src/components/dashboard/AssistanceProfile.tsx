"use client";

import React from "react";

interface AssistanceProfileProps {
  name: string;
  rating: number;
  servicesCount: number;
  isVerified: boolean;
  isJunior?: boolean;
  specialties: string[];
}

export default function AssistanceProfile({
  name,
  rating,
  servicesCount,
  isVerified,
  isJunior,
  specialties
}: AssistanceProfileProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-5 transition-opacity group-hover:opacity-10 ${isJunior ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Image/Initial */}
        <div className="relative">
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-extrabold text-white shadow-inner ${isJunior ? 'bg-blue-600' : 'bg-emerald-600'}`}>
            {name.charAt(0)}
          </div>
          {isVerified && (
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-950 p-1.5 rounded-full shadow-lg border-2 border-slate-900">
              <span className="text-emerald-500 text-xl block">✅</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row items-center md:items-baseline space-y-2 md:space-y-0 md:space-x-3">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">{name}</h3>
              {isJunior && (
                <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20">
                  Assistência Júnior
                </span>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-yellow-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-slate-700 opacity-50"}>★</span>
                ))}
              </div>
              <span className="text-white font-bold text-sm">{rating.toFixed(1)}</span>
              <span className="text-slate-500 text-xs">• {servicesCount} serviços realizados</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {specialties.map((spec, i) => (
              <span key={i} className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-700/50">
                {spec}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors shadow-lg active:scale-95">
              Ver Perfil Completo
            </button>
            <button className={`flex-1 border py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${isJunior ? 'border-blue-500/50 text-blue-500 hover:bg-blue-500/10' : 'border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10'}`}>
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Preview (Small) */}
      <div className="mt-8 bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
        <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-70">Avaliações Recentes</h4>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[8px]">👤</div>
              <p className="text-xs text-white font-bold">Ricardo M.</p>
              <div className="flex text-[8px] text-yellow-500">★★★★★</div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">"Excelente serviço, rápido e honesto. Meu celular ficou como novo!"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
