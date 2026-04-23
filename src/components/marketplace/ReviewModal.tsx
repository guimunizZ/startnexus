"use client";

// src/components/marketplace/ReviewModal.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
    open: boolean;
    onCloseAction: () => void;
    assistanceId: string;
    selectedRating: number;
};

export default function ReviewModal({
                                        open,
                                        onCloseAction,
                                        assistanceId,
                                        selectedRating,
                                    }: Props) {
    const [rating, setRating] = useState(selectedRating);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRating(selectedRating);
    }, [selectedRating]);

    if (!open) return null;

    async function handleSave() {
        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("Faça login para avaliar.");
            setLoading(false);
            return;
        }

        const { data: existing } = await supabase
            .from("reviews")
            .select("id")
            .eq("client_id", user.id)
            .eq("assistance_id", assistanceId)
            .maybeSingle();

        if (existing) {
            await supabase
                .from("reviews")
                .update({
                    rating,
                    comment,
                })
                .eq("id", existing.id);
        } else {
            await supabase.from("reviews").insert({
                client_id: user.id,
                assistance_id: assistanceId,
                rating,
                comment,
            });
        }

        setLoading(false);
        onCloseAction();
        window.location.reload();
    }

    const active = hovered || rating;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">
            <div className="w-full max-w-xl rounded-[30px] bg-slate-900 border border-slate-700 p-7 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white">
                        Sua avaliação
                    </h3>

                    <button
                        onClick={onCloseAction}
                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700"
                    >
                        ✕
                    </button>
                </div>

                {/* estrelas */}
                <div className="mt-7 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const enabled = star <= active;

                        return (
                            <button
                                key={star}
                                onMouseEnter={() =>
                                    setHovered(star)
                                }
                                onMouseLeave={() =>
                                    setHovered(0)
                                }
                                onClick={() => setRating(star)}
                                className={`text-4xl transition-all ${
                                    enabled
                                        ? "text-yellow-400 scale-110"
                                        : "text-slate-600"
                                }`}
                            >
                                ★
                            </button>
                        );
                    })}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    placeholder="Conte como foi sua experiência..."
                    className="mt-7 w-full h-44 rounded-2xl bg-slate-950 border border-slate-700 p-5 resize-none outline-none focus:border-emerald-500 text-white"
                />

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onCloseAction}
                        className="flex-1 h-12 rounded-2xl bg-slate-800 font-bold text-white"
                    >
                        Cancelar
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSave}
                        className="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-slate-950 disabled:opacity-50"
                    >
                        {loading
                            ? "Salvando..."
                            : "Enviar"}
                    </button>
                </div>
            </div>
        </div>
    );
}