// ==============================================
// ARQUIVO: src/components/marketplace/PublicServiceCard.tsx
// ==============================================

"use client";

import {
    Monitor,
    Smartphone,
    Laptop,
    Wrench,
} from "lucide-react";

type Props = {
    service: {
        title: string;
        description: string;
        price: number;
        time: string;
        icon: string;
    };
};

export default function PublicServiceCard({ service }: Props) {
    const icons = {
        monitor: Monitor,
        phone: Smartphone,
        laptop: Laptop,
        tool: Wrench,
    };

    const Icon =
        icons[service.icon as keyof typeof icons] || Monitor;

    return (
        <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500/40 transition-all">
            <div className="flex items-start justify-between gap-5">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Icon size={26} />
                    </div>

                    <div>
                        <h3 className="text-xl font-black">{service.title}</h3>
                        <p className="text-slate-400 text-sm mt-1 max-w-md">
                            {service.description}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-2xl font-black text-emerald-400">
                        R$ {service.price}
                    </p>
                    <p className="text-sm text-slate-400">
                        {service.time}
                    </p>
                </div>
            </div>

            <button className="mt-6 w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black">
                Agendar
            </button>
        </div>
    );
}