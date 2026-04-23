"use client";

// src/components/marketplace/PublicAssistanceHero.tsx

import { useState } from "react";
import ReviewModal from "./ReviewModal";

type Props = {
    assistanceId: string;
    name?: string;
    rating?: number;
    reviews?: number;
    verified?: boolean;
    junior?: boolean;
    servicesCount?: number;
    address?: string;
    description?: string;
};

export default function PublicAssistanceHero({
                                                 assistanceId,
                                                 name = "Assistência Técnica",
                                                 rating = 0,
                                                 reviews = 0,
                                                 verified = true,
                                                 junior = false,
                                                 servicesCount = 0,
                                                 address = "",
                                                 description = "",
                                             }: Props) {
    const [hoveredStar, setHoveredStar] =
        useState(0);

    const [selectedStar, setSelectedStar] =
        useState(0);

    const [open, setOpen] = useState(false);

    const activeStars =
        hoveredStar || selectedStar;

    function handleClickStar(value: number) {
        setSelectedStar(value);
        setOpen(true);
    }

    return (
        <>
            <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">
                {/* topo */}
                <div className="h-40 bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500" />

                <div className="relative px-8 pb-8">
                    {/* avatar */}
                    <div className="-mt-16 flex justify-center">
                        <div className="w-32 h-32 rounded-3xl border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                            {name.charAt(0)}
                        </div>
                    </div>

                    {/* nome */}
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
                            {reviews} avaliações
                        </p>

                        {address && (
                            <p className="mt-2 text-slate-500 text-sm">
                                {address}
                            </p>
                        )}

                        {description && (
                            <p className="mt-4 text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* estrelas */}
                    <div className="mt-7 flex justify-center">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const active =
                                    star <= activeStars;

                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() =>
                                            setHoveredStar(star)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredStar(0)
                                        }
                                        onClick={() =>
                                            handleClickStar(star)
                                        }
                                        className={`text-3xl transition-all duration-200 ${
                                            active
                                                ? "text-yellow-400 scale-110"
                                                : "text-slate-600 hover:text-yellow-300"
                                        }`}
                                    >
                                        ★
                                    </button>
                                );
                            })}

                            <span className="ml-3 text-white font-bold text-lg">
                {rating > 0
                    ? rating.toFixed(1)
                    : "Novo"}
              </span>
                        </div>
                    </div>

                    {/* infos */}
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">
                                Tempo médio
                            </p>
                            <p className="text-white font-black mt-1">
                                1h 45m
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">
                                Serviços
                            </p>
                            <p className="text-white font-black mt-1">
                                {servicesCount}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 text-center">
                            <p className="text-slate-400 text-sm">
                                Nota geral
                            </p>
                            <p className="text-emerald-400 font-black mt-1">
                                {rating > 0
                                    ? rating.toFixed(1)
                                    : "--"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ReviewModal
                open={open}
                onCloseAction={() =>
                    setOpen(false)
                }
                assistanceId={assistanceId}
                selectedRating={selectedStar}
            />
        </>
    );
}