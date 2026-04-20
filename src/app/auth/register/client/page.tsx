"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import ClientForm from "@/components/forms/ClientForm";

export default function RegisterClientPage() {
  return (
    <AuthLayout>
      <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col bg-white dark:bg-slate-900 relative overflow-y-auto max-h-screen">
        {/* Navigation */}
        <div className="absolute top-8 left-8">
          <Link href="/auth/register" className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-bold text-sm">Voltar</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 py-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-emerald-500 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                SN
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Crie sua conta de Cliente</h1>
            <p className="text-slate-500 dark:text-slate-400">Encontre as melhores assistências técnicas da região.</p>
          </div>

          <ClientForm />

          <p className="text-center text-sm text-slate-500 pt-6">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
