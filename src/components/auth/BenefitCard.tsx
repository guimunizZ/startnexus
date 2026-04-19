import React from "react";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02] group">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
