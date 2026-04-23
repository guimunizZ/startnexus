"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";

type Props = {
    name?: string;
    rating?: number;
    reviews?: number;
    verified?: boolean;
    junior?: boolean;
};

export default function PublicAssistanceHero({
                                                 name = "Tech Nexus Solutions",
                                                 rating = 4.9,
                                                 reviews = 128,
                                                 verified = true,
                                                 junior = false,
                                             }: Props) {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedStar, setSelectedStar] = useState(0);
    const [open, setOpen] = useState(false);

    function handleClickStar(value: number) {
        setSelectedStar(value);
        setOpen(true);
    }

    const activeStars = hoveredStar || selectedStar;

    return (
        <>
            <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">
                {/* Faixa topo */}
                <div className="h-40 bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500" />

                {/* Conteúdo */}
                <div className="relative px-8 pb-8">
                    {/* Avatar */}
                    <div className="-mt-16 flex justify-center">
                        <div className="w-32 h-32 rounded-3xl border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                            {name.charAt(0)}
                        </div>
                    </div>

                    {/* Nome */}
                    <div className="mt-5 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-black text-white">
                                {name}
                            </h1>

                            {verified && (
                                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Verificado
                </span>
                            )}

                            {junior && (
                                <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  Júnior
                </span>
                            )}
                        </div>

                        <p className="mt-2 text-slate-400">
                            {reviews} avaliações • Atendimento especializado
                        </p>
                    </div>

                    {/* Estrelas */}
                    <div className="mt-7 flex justify-center">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const active = star <= activeStars;

                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        onClick={() => handleClickStar(star)}
                                        className={`text-3xl transition-all duration-200 ${
                                            active
                                                ? "text-yellow-400 scale-110"
                                                : "text-slate-600 hover:text-yellow-300"
                                        } ${hoveredStar === star ? "animate-pulse" : ""}`}
                                    >
                                        ★
                                    </button>
                                );
                            })}

                            <span className="ml-3 text-white font-bold text-lg">
                {rating.toFixed(1)}
              </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">Tempo médio</p>
                            <p className="text-white font-black mt-1">1h 45m</p>
                        </div>

                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">Serviços</p>
                            <p className="text-white font-black mt-1">+35</p>
                        </div>

                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">Nota geral</p>
                            <p className="text-emerald-400 font-black mt-1">
                                {rating.toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ReviewModal
                open={open}
                onCloseAction={() => setOpen(false)}
            />
        </>
    );
}