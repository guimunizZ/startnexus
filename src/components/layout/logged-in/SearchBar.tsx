"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  role: "client" | "assistance";
}

export default function SearchBar({ role }: SearchBarProps) {
  return (
    <div className="relative group w-full max-w-md hidden md:block">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={18} className="text-slate-400 group-focus-within:text-[#00FF88] transition-colors" />
      </div>
      <input
        type="text"
        placeholder={role === "client" ? "Buscar assistência ou serviço..." : "Buscar solicitações ou clientes..."}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] focus:ring-4 focus:ring-[#00FF88]/5 transition-all"
      />
    </div>
  );
}
