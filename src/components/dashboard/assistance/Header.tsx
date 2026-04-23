"use client";

import React from "react";
import { Star, Bell, Search } from "lucide-react";

interface HeaderProps {
  user: any;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-20 bg-[#071a2d]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Olá, {user?.profile?.nickname || user?.email?.split('@')[0]} 👋
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider">Online</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-white">4.9</span>
          <span className="text-xs text-slate-300 font-bold">(32 avaliações)</span>
        </div>

        <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-300 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#071a2d]"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-bold text-white">{user?.profile?.nickname}</p>
            <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Plano Profissional</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
            {user?.profile?.avatar_url ? (
              <img src={user.profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-slate-200">
                {user?.profile?.nickname?.[0] || user?.email?.[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
