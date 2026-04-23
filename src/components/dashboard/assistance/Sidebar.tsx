// src/components/dashboard/assistance/Sidebar.tsx

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
  LogOut,
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
    } catch (error) {
      console.error(error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
      <aside className="w-64 bg-[#07111d] min-h-screen fixed left-0 top-0 flex flex-col z-50 border-r border-white/5">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-900 rounded-sm" />
            </div>

            <div>
              <p className="text-white font-black text-lg tracking-tight">
                StartNexus
              </p>
              <p className="text-white/40 text-[10px] font-bold uppercase">
                Painel B2B
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition ${
                        active
                            ? "bg-primary text-slate-900"
                            : "text-white/55 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
  );
}