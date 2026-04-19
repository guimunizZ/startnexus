"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AssistanceForm from "@/components/forms/AssistanceForm";

export default function RegisterAssistancePage() {
  return (
    <AuthLayout>
      <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col bg-white dark:bg-slate-900 overflow-y-auto max-h-[90vh]">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/auth/register" className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium text-sm">Voltar para seleção</span>
          </Link>
        </div>

        <div className="max-w-2xl w-full mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-blue-500">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  SN
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
              </div>
              <div className="text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                Perfil Profissional
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Cadastro de Assistência</h1>
            <p className="text-slate-500 dark:text-slate-400">Torne-se um parceiro StartNexus e comece a receber pedidos.</p>
          </div>

          <AssistanceForm />

          <p className="text-center text-sm text-slate-500 pt-8 border-t border-slate-100 dark:border-slate-800">
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
