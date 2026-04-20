"use client";

import Link from "next/link";
import CollectionArea from "@/components/dashboard/CollectionArea";
import AssistanceProfile from "@/components/dashboard/AssistanceProfile";

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3 text-blue-500 group">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                SN
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">StartNexus <span className="text-blue-500 text-sm font-bold bg-blue-500/10 px-2 py-0.5 rounded-md">B2B</span></span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/auth/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                Sair
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-xl shadow-blue-900/30 active:scale-95">
                Painel do Técnico
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <header className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl leading-tight">
                Painel de <br /><span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">Performance Técnica</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl font-medium">
                Gerencie seus serviços, acompanhe sua reputação e contribua com a logística reversa.
              </p>
            </header>

            {/* My Profile Preview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                <span>📊</span>
                <span>Meu Perfil Público</span>
              </h2>
              <AssistanceProfile
                name="Tech Nexus Solutions"
                rating={4.9}
                servicesCount={124}
                isVerified={true}
                specialties={["iPhone", "MacBook", "Placa Mãe"]}
              />
            </section>

            {/* Active Orders Section Placeholder */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Ordens de Serviço Ativas</h3>
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-2xl opacity-50">📅</div>
                <p className="text-slate-500 text-sm">Você não possui ordens pendentes no momento.</p>
                <button className="text-blue-500 font-bold text-sm hover:underline">Ver histórico de serviços</button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-700">
            {/* Collection Area Integration */}
            <CollectionArea />

            {/* Growth Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 bg-blue-500 h-full"></div>
              <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
                <span>🚀</span>
                <span>Dicas de Crescimento</span>
              </h3>
              <div className="space-y-5">
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">1</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Mantenha seu portfólio de fotos sempre atualizado.</p>
                </div>
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">2</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Responda orçamentos em menos de 2 horas para converter mais.</p>
                </div>
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">3</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Colete lixo eletrônico para subir no Ranking Sustentável.</p>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl shadow-blue-900/30 group">
              <h3 className="text-xl font-bold text-white mb-2">Suporte StartNexus</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">Precisa de ajuda com a plataforma ou dúvidas técnicas? Nosso time está online.</p>
              <button className="w-full bg-white text-blue-600 py-3.5 rounded-xl font-extrabold text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
