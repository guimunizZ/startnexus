"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleSelector from "@/components/auth/RoleSelector";

export default function RegisterChoicePage() {
  return (
    <AuthLayout>
      <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 relative">
        {/* Top Navigation */}
        <div className="absolute top-8 left-8">
          <Link href="/auth/login" className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium text-sm">Voltar para Login</span>
          </Link>
        </div>

        {/* Logo (Centered on top) */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-900/20 mb-4">
            SN
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">StartNexus</span>
        </div>

        <RoleSelector />

        {/* Footer info */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
        </div>
      </div>
    </AuthLayout>
  );
}
