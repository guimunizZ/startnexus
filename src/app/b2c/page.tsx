"use client";

import Link from "next/link";
import CollectionArea from "@/components/dashboard/CollectionArea";
import AssistanceProfile from "@/components/dashboard/AssistanceProfile";

export default function B2CPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3 text-emerald-500 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                SN
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">StartNexus <span className="text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">B2C</span></span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/auth/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                Sair
              </Link>
              <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all shadow-xl shadow-emerald-900/30 active:scale-95">
                Minha Conta
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
                Olá! Como podemos <br /><span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">ajudar você</span> hoje?
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl font-medium">
                Encontre especialistas para seus eletrônicos ou solicite uma coleta sustentável em poucos cliques.
              </p>
            </header>

            {/* Assistance List Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
                  <span>🛠️</span>
                  <span>Assistências Recomendadas</span>
                </h2>
                <Link href="/search" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors">Ver todas →</Link>
              </div>
              <div className="grid gap-6">
                <AssistanceProfile
                  name="Tech Nexus Solutions"
                  rating={4.9}
                  servicesCount={124}
                  isVerified={true}
                  specialties={["iPhone", "MacBook", "Placa Mãe"]}
                />
                <AssistanceProfile
                  name="Junior Tech Lab"
                  rating={4.7}
                  servicesCount={32}
                  isVerified={true}
                  isJunior={true}
                  specialties={["Android", "Windows", "Limpeza"]}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-700">
            {/* Collection Area Integration */}
            <CollectionArea />

            {/* Safety & Trust Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 bg-emerald-500 h-full"></div>
              <h3 className="text-xl font-extrabold text-white flex items-center space-x-2">
                <span>🛡️</span>
                <span>Sua Segurança</span>
              </h3>
              <div className="space-y-5">
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">✓</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Técnicos verificados e avaliados pela comunidade.</p>
                </div>
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">✓</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Garantia de serviço em todos os reparos Nexus.</p>
                </div>
                <div className="flex items-start space-x-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">✓</div>
                  <p className="text-sm text-slate-400 group-hover/item:text-slate-200 transition-colors">Pagamento 100% seguro via plataforma.</p>
                </div>
              </div>
            </div>

            {/* Sustainability Info */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 p-8 rounded-3xl relative group overflow-hidden shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-emerald-500 font-extrabold text-lg italic mb-3">Dica Nexus Eco</h3>
              <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                Ao realizar um descarte eletrônico, você ganha **Pontos Nexus** que podem ser trocados por descontos exclusivos em futuros reparos! ♻️
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
