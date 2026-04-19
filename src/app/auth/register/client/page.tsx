"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import ClientForm from "@/components/forms/ClientForm";

export default function RegisterClientPage() {
  return (
    <AuthLayout>
      <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col bg-white dark:bg-slate-900">
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/auth/register" className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium text-sm">Voltar para seleção</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-emerald-500">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  SN
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
              </div>
              <div className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                Passo 2 de 2
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cadastro de Cliente</h1>
            <p className="text-slate-500 dark:text-slate-400">Preencha seus dados para começar a usar a plataforma.</p>
          </div>

          <ClientForm />

          <p className="text-center text-sm text-slate-500 pt-4">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
