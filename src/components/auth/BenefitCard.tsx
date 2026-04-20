import React from "react";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all duration-500 hover:bg-slate-800/60 group shadow-lg">
      <div className="flex items-start space-x-5">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
