import React from "react";
import Link from "next/link";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  buttonText: string;
  color: "emerald" | "blue";
}

function RoleCard({ title, description, icon, href, buttonText, color }: RoleCardProps) {
  const colorClasses = {
    emerald: "hover:border-emerald-500/50 group-hover:bg-emerald-500/10 text-emerald-500",
    blue: "hover:border-blue-500/50 group-hover:bg-blue-500/10 text-blue-500",
  };

  const btnClasses = {
    emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20",
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-900/20",
  };

  return (
    <Link href={href} className="group">
      <div className={`h-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ${colorClasses[color]} flex flex-col items-center text-center space-y-4 hover:scale-[1.02] hover:shadow-xl`}>
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
          {description}
        </p>
        <div className={`mt-auto px-6 py-2.5 rounded-xl text-white font-medium transition-all shadow-lg ${btnClasses[color]}`}>
          {buttonText}
        </div>
      </div>
    </Link>
  );
}

export default function RoleSelector() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Como deseja usar a <span className="text-emerald-500">StartNexus</span>?
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Escolha o perfil que melhor se adapta às suas necessidades.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <RoleCard
          title="Cliente"
          description="Quero contratar assistência técnica especializada ou solicitar coleta de resíduos eletrônicos."
          icon="👤"
          href="/auth/register/client"
          buttonText="Continuar como Cliente"
          color="emerald"
        />
        <RoleCard
          title="Assistência Técnica"
          description="Sou técnico ou assistente júnior e quero oferecer meus serviços e conquistar novos clientes."
          icon="🔧"
          href="/auth/register/assistance"
          buttonText="Continuar como Assistência"
          color="blue"
        />
      </div>
    </div>
  );
}
