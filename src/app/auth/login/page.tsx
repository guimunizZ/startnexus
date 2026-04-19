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
      {/* Coluna Esquerda - Formulário */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo & Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-500 mb-8">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                SN
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Entre na StartNexus</h1>
            <p className="text-slate-500 dark:text-slate-400">Marketplace técnico + sustentabilidade</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Footer */}
          <div className="pt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Não tem uma conta?{" "}
              <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Hero / Pillars */}
      <LoginHero />
    </AuthLayout>
  );
}
