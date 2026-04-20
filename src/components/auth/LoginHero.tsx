import React from "react";
import BenefitCard from "./BenefitCard";

export default function LoginHero() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-slate-900 p-12 flex-col justify-center relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 space-y-8">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            A revolução do <span className="text-emerald-500">Marketplace Técnico</span>
          </h2>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed">
            Conectamos tecnologia, sustentabilidade e oportunidade em uma única plataforma premium.
          </p>
        </div>

        <div className="space-y-6">
          <BenefitCard
            icon="🚀"
            title="Oportunidade Profissional"
            description="Estudantes com conhecimento básico podem atuar como Assistência Júnior e conquistar experiência real."
          />
          <BenefitCard
            icon="♻️"
            title="Logística Sustentável"
            description="Controle total do lixo eletrônico. Solicite coletas, acompanhe histórico e acumule pontos Nexus."
          />
          <BenefitCard
            icon="🛡️"
            title="Confiança & Credibilidade"
            description="Escolha assistências através de avaliações reais e reputação pública garantida pela comunidade."
          />
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-sm shadow-xl`}>
                  👤
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white font-bold">+1.200 membros</p>
              <p className="text-slate-500">já fazem parte da nossa rede</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
