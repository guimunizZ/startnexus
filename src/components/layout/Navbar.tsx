// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Menu, X } from "lucide-react";
import { AuthService } from "@/client/services/authService";

const authService = new AuthService();

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void loadUser();
  }, []);

  async function loadUser() {
    const current = await authService.getCurrentUser();
    setUser(current);
  }

  async function logout() {
    await authService.logout();
    router.push("/");
  }

  return (
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-24 px-6 flex items-center justify-between">

          {/* LOGO MAIS BAIXO E ADAPTADA DARK */}
          <Link
              href="/"
              className="flex items-center shrink-0 pt-3 brightness-125 contrast-125"
          >
            <Image
                src="/logo-light.png"
                alt="StartNexus"
                width={200}
                height={78}
                priority
                className="object-contain drop-shadow-[0_0_18px_rgba(0,245,160,0.18)]"
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#inicio" className="hover:text-foreground transition-colors">
              Início
            </a>

            <a
                href="#quem-somos"
                className="hover:text-foreground transition-colors"
            >
              Quem Somos
            </a>

            <a
                href="#solucoes"
                className="hover:text-foreground transition-colors"
            >
              Soluções
            </a>

            <a
                href="#marketplace-preview"
                className="hover:text-foreground transition-colors"
            >
              Marketplace
            </a>
          </nav>

          {/* BOTÕES DIREITA */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
                <>
                  <Link
                      href="/auth/login"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    Entrar
                  </Link>

                  <Link
                      href="/auth/register"
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-brand shadow-glow-primary"
                  >
                    Começar
                  </Link>
                </>
            ) : (
                <>
                  <Link
                      href="/b2c"
                      className="p-2.5 rounded-xl bg-surface hover:bg-white/10 transition"
                  >
                    <User size={18} />
                  </Link>

                  <button
                      onClick={() => void logout()}
                      className="p-2.5 rounded-xl bg-surface hover:bg-white/10 transition"
                  >
                    <LogOut size={18} />
                  </button>
                </>
            )}
          </div>

          {/* MOBILE */}
          <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-xl bg-surface"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {open && (
            <div className="lg:hidden border-t border-white/10 px-6 py-5 bg-background space-y-4">
              <a href="#inicio" className="block text-sm">
                Início
              </a>

              <a href="#quem-somos" className="block text-sm">
                Quem Somos
              </a>

              <a href="#solucoes" className="block text-sm">
                Soluções
              </a>

              <a href="#marketplace-preview" className="block text-sm">
                Marketplace
              </a>
            </div>
        )}
      </header>
  );
}