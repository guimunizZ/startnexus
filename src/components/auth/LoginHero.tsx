import React from "react";
import BenefitCard from "./BenefitCard";

export default function LoginHero() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-slate-900 p-12 flex-col justify-center relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 space-y-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Por que escolher a <span className="text-emerald-500">StartNexus</span>?
          </h2>
          <p className="text-slate-400 max-w-md">
            Conectamos você ao melhor da tecnologia com foco em excelência e sustentabilidade.
          </p>
        </div>

        <div className="space-y-6">
          <BenefitCard
            icon="🧑‍🔧"
            title="Assistências confiáveis"
            description="Encontre técnicos avaliados, confiáveis e próximos de você."
          />
          <BenefitCard
            icon="♻️"
            title="Coleta sustentável"
            description="Solicite descarte eletrônico e ajude o meio ambiente."
          />
          <BenefitCard
            icon="🚀"
            title="Oportunidade profissional"
            description="Novos assistentes podem crescer e conquistar clientes."
          />
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] text-white`}>
                  👤
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="text-emerald-400 font-medium">+1.200</span> usuários cadastrados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
