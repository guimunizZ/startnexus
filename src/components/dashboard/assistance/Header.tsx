"use client";

import React from "react";
import { Star, Bell, Search } from "lucide-react";

interface HeaderProps {
  user: any;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-gray/50 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-extrabold text-dark tracking-tight">
          Olá, {user?.profile?.nickname || user?.email?.split('@')[0]} 👋
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray/30 rounded-full border border-gray">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-extrabold text-dark uppercase tracking-wider">Online</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray/30 rounded-xl border border-gray">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-dark">4.9</span>
          <span className="text-xs text-dark/40 font-bold">(32 avaliações)</span>
        </div>

        <button className="p-2.5 bg-gray/30 rounded-xl border border-gray text-dark/60 hover:text-dark transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray">
          <div className="text-right">
            <p className="text-sm font-bold text-dark">{user?.profile?.nickname}</p>
            <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Plano Profissional</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray border border-gray flex items-center justify-center overflow-hidden">
            {user?.profile?.avatar_url ? (
              <img src={user.profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-dark/30">
                {user?.profile?.nickname?.[0] || user?.email?.[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
