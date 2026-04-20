import React from "react";
import Link from "next/link";

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  buttonText: string;
  color: "emerald" | "blue";
  footerText?: string;
}

function RoleCard({ title, description, icon, href, buttonText, color, footerText }: RoleCardProps) {
  const colorClasses = {
    emerald: "hover:border-emerald-500/50 group-hover:bg-emerald-500/10 text-emerald-500 border-slate-200 dark:border-slate-800 shadow-emerald-900/5",
    blue: "hover:border-blue-500/50 group-hover:bg-blue-500/10 text-blue-500 border-slate-200 dark:border-slate-800 shadow-blue-900/5",
  };

  const btnClasses = {
    emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20 hover:shadow-emerald-500/30",
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-900/20 hover:shadow-blue-500/30",
  };

  return (
    <Link href={href} className="group">
      <div className={`h-full p-8 rounded-3xl border bg-white dark:bg-slate-900 transition-all duration-500 ${colorClasses[color]} flex flex-col items-center text-center space-y-5 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden`}>
        {/* Decorative background circle */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 ${color === "emerald" ? "bg-emerald-500" : "bg-blue-500"}`}></div>

        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-5xl mb-2 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          {icon}
        </div>
        <div className="space-y-3 flex-1">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            {description}
          </p>
          {footerText && (
            <p className="text-xs text-slate-400 italic bg-slate-100 dark:bg-slate-800/50 py-2 px-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
              {footerText}
            </p>
          )}
        </div>
        <div className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg transform group-active:scale-95 ${btnClasses[color]}`}>
          {buttonText}
        </div>
      </div>
    </Link>
  );
}

export default function RoleSelector() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Como deseja usar a <span className="text-emerald-500">StartNexus</span>?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Seja você um cliente em busca de excelência ou um profissional pronto para crescer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-4 sm:px-0">
        <RoleCard
          title="Quero Assistência"
          description="Busco técnicos confiáveis para reparar meus aparelhos com garantia e transparência."
          icon="👤"
          href="/auth/register/client"
          buttonText="Sou Cliente"
          color="emerald"
        />
        <RoleCard
          title="Quero ser Assistência"
          description="Sou técnico, estudante ou empresa e quero oferecer meus serviços para novos clientes."
          icon="🔧"
          href="/auth/register/assistance"
          buttonText="Sou Profissional"
          color="blue"
          footerText="Estudantes e juniores são bem-vindos com suporte especializado!"
        />
      </div>
    </div>
  );
}
