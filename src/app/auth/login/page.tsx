"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/authService";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginHero from "@/components/auth/LoginHero";

const authService = new AuthService();

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
      e: { preventDefault: () => void }
  ): Promise<void> {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      await authService.login(email, password);

      void router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
      <AuthLayout>
        <LoginHero />

        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-emerald-500 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  SN
                </div>

                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                StartNexus
              </span>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Bem-vindo de volta
              </h1>

              <p className="text-slate-500 dark:text-slate-400">
                Acesse sua conta para gerenciar seus serviços
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    E-mail
                  </label>

                  <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      placeholder="exemplo@email.com"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-slate-700"
                    >
                      Senha
                    </label>

                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-emerald-600 font-medium"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>

                  <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none"
                  />
                </div>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all"
              >
                {loading ? "Entrando..." : "Entrar na Plataforma"}
              </button>
            </form>

            <div className="pt-8 text-center border-t border-slate-100">
              <p className="text-slate-600">
                Ainda não tem uma conta?{" "}
                <Link
                    href="/auth/register"
                    className="text-emerald-600 hover:text-emerald-500 font-bold"
                >
                  Criar conta agora
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
  );
}
