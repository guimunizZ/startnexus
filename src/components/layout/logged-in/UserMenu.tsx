"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LayoutDashboard,
  Search,
  LogOut,
} from "lucide-react";

interface Props {
  user: any;
  role: "client" | "assistance";
  onLogout: () => Promise<void> | void;
}

export default function UserMenu({ user, role, onLogout }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const nickname =
      user?.profile?.nickname ||
      user?.profile?.first_name ||
      user?.email?.split("@")[0] ||
      "Usuário";

  const initials = nickname.charAt(0).toUpperCase();

  const items =
      role === "client"
          ? [
            {
              icon: User,
              label: "Meu Perfil",
              href: "/perfil",
            },
            {
              icon: Search,
              label: "Buscar Assistências",
              href: "/marketplace",
            },
            {
              icon: LayoutDashboard,
              label: "Área do Cliente",
              href: "/b2c",
            },
            {
              icon: Settings,
              label: "Configurações",
              href: "/configuracoes",
            },
          ]
          : [
            {
              icon: LayoutDashboard,
              label: "Dashboard",
              href: "/b2b",
            },
            {
              icon: User,
              label: "Perfil Público",
              href: "/assistencia/perfil",
            },
            {
              icon: Settings,
              label: "Configurações",
              href: "/configuracoes",
            },
          ];

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
      <div className="relative">
        <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow hover:scale-105 transition"
        >
          {initials}
        </button>

        <AnimatePresence>
          {open && (
              <>
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                />

                <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                      Conta
                    </p>

                    <p className="text-sm font-bold text-slate-900 mt-1 truncate">
                      {nickname}
                    </p>

                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>

                    <span className="inline-flex mt-3 px-2 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                  {role === "client" ? "Cliente" : "Assistência"}
                </span>
                  </div>

                  <div className="p-2">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.href)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                          <item.icon size={18} className="text-slate-400" />
                          {item.label}
                        </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50">
                    <button
                        onClick={async () => {
                          setOpen(false);
                          await onLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />
                      Sair
                    </button>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </div>
  );
}