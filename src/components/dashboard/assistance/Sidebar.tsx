"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  Wrench, 
  User, 
  Star, 
  DollarSign, 
  Settings, 
  LogOut 
} from "lucide-react";
import { AuthService } from "@/client/services/authService";

const authService = new AuthService();

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/b2b" },
  { icon: ShoppingBag, label: "Pedidos", href: "/b2b/pedidos" },
  { icon: Calendar, label: "Agenda", href: "/b2b/agenda" },
  { icon: Wrench, label: "Serviços", href: "/b2b/servicos" },
  { icon: User, label: "Perfil Público", href: "/b2b/perfil" },
  { icon: Star, label: "Avaliações", href: "/b2b/avaliacoes" },
  { icon: DollarSign, label: "Financeiro", href: "/b2b/financeiro" },
  { icon: Settings, label: "Configurações", href: "/b2b/configuracoes" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Erro ao sair:", err);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <aside className="w-64 bg-dark min-h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm" />
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-white">STARTNEXUS</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group ${
                isActive 
                  ? "bg-primary text-dark shadow-lg shadow-primary/20" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={20} className={isActive ? "text-dark" : "text-white/30 group-hover:text-white/60"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
