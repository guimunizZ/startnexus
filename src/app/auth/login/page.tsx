"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/server/services/authService";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginHero from "@/components/auth/LoginHero";

const authService = new AuthService();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await authService.login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      {/* Coluna Esquerda - Hero com os 3 Pilares */}
      <LoginHero />

      {/* Coluna Direita - Formulário Centralizado */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <div className="max-w-md w-full space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-emerald-500 mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-900/20">
                SN
              </div>
              <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bem-vindo de volta</h1>
            <p className="text-slate-500 dark:text-slate-400">Acesse sua conta para gerenciar seus serviços</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                    Senha
                  </label>
                  <Link href="/auth/forgot-password" title="Esqueceu a senha?" className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar na Plataforma</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="pt-8 text-center border-t border-slate-100 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400">
              Ainda não tem uma conta?{" "}
              <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors inline-flex items-center space-x-1 group">
                <span>Criar conta agora</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
