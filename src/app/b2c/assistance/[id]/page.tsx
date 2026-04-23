// ==============================================
// ARQUIVO: src/app/b2c/assistance/[id]/page.tsx
// ==============================================

"use client";

import Link from "next/link";
import PublicAssistanceHero from "@/components/marketplace/PublicAssistanceHero";
import PublicServiceCard from "@/components/marketplace/PublicServiceCard";

const services = [
    {
        id: 1,
        title: "Troca de Tela iPhone",
        description: "Substituição com peça premium e testes completos.",
        price: 850,
        time: "1h",
        icon: "phone",
    },
    {
        id: 2,
        title: "Formatação Windows 11",
        description: "Backup básico + instalação + drivers.",
        price: 150,
        time: "3h",
        icon: "monitor",
    },
    {
        id: 3,
        title: "Upgrade SSD Notebook",
        description: "Instalação física + otimização.",
        price: 350,
        time: "2h",
        icon: "laptop",
    },
    {
        id: 4,
        title: "Limpeza Interna Completa",
        description: "Remoção de poeira e troca de pasta térmica.",
        price: 220,
        time: "2h",
        icon: "tool",
    },
];

export default function PublicAssistancePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950/95 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/b2c" className="font-black text-2xl text-emerald-400">
                        StartNexus
                    </Link>

                    <Link
                        href="/b2c"
                        className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold"
                    >
                        Voltar
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <PublicAssistanceHero />

                <section className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black">Serviços Disponíveis</h2>
                        <span className="text-slate-400 text-sm">
              {services.length} serviços
            </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {services.map((service) => (
                            <PublicServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}