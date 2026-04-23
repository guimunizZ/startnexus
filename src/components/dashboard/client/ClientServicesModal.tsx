"use client";

import { useMemo, useState } from "react";
import serviceOptions from "@/shared/utils/clientServiceOptions";
import { updateWantedServices } from "@/services/clientProfileService";

type Props = {
    userId: string;
    currentItems: string[];
    onCloseAction: () => void;
    onSavedAction: () => void;
};

export default function ClientServicesModal({
                                                userId,
                                                currentItems,
                                                onCloseAction,
                                                onSavedAction
                                            }: Props) {
    const [items, setItems] =
        useState<string[]>(
            currentItems || []
        );

    const [term, setTerm] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const suggestions =
        useMemo(() => {
            if (!term.trim())
                return [];

            return serviceOptions
                .filter((item) =>
                    item
                        .toLowerCase()
                        .includes(
                            term.toLowerCase()
                        )
                )
                .slice(0, 10);
        }, [term]);

    function addItem(
        value: string
    ) {
        const clean =
            value.trim();

        if (!clean) return;

        if (
            items.includes(clean)
        )
            return;

        setItems([
            ...items,
            clean
        ]);

        setTerm("");
    }

    function removeItem(
        value: string
    ) {
        setItems(
            items.filter(
                (item) =>
                    item !== value
            )
        );
    }

    async function save() {
        try {
            setLoading(true);

            await updateWantedServices(
                userId,
                items
            );

            onSavedAction();
            onCloseAction();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 p-8">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-black">
                        O que procura
                    </h2>

                    <button
                        onClick={
                            onCloseAction
                        }
                        className="w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white font-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* INPUT */}
                <div className="flex gap-3">
                    <input
                        value={term}
                        onChange={(e) =>
                            setTerm(
                                e.target
                                    .value
                            )
                        }
                        placeholder="Escreva palavras chaves"
                        className="flex-1 px-5 py-4 rounded-2xl bg-white text-slate-950"
                    />

                    <button
                        onClick={() =>
                            addItem(
                                term
                            )
                        }
                        className="w-16 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-3xl font-black"
                    >
                        +
                    </button>
                </div>

                {/* SUGESTÕES */}
                {suggestions.length >
                    0 && (
                        <div className="mt-5 flex flex-wrap gap-3">
                            {suggestions.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <button
                                        key={
                                            index
                                        }
                                        onClick={() =>
                                            addItem(
                                                item
                                            )
                                        }
                                        className="px-4 py-2 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition"
                                    >
                                        {item}
                                    </button>
                                )
                            )}
                        </div>
                    )}

                {/* SELECIONADOS */}
                <div className="mt-8">
                    <h3 className="text-sm text-slate-400 mb-3">
                        Selecionados
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {items.length ===
                        0 ? (
                            <p className="text-slate-500 text-sm">
                                Nenhum item adicionado.
                            </p>
                        ) : (
                            items.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <button
                                        key={
                                            index
                                        }
                                        onClick={() =>
                                            removeItem(
                                                item
                                            )
                                        }
                                        className="px-4 py-2 rounded-full border border-slate-700 bg-slate-950 hover:border-red-500 transition"
                                    >
                                        {item}
                                    </button>
                                )
                            )
                        )}
                    </div>
                </div>

                {/* SAVE */}
                <button
                    onClick={save}
                    disabled={
                        loading
                    }
                    className="mt-8 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg"
                >
                    {loading
                        ? "Salvando..."
                        : "Salvar Alterações"}
                </button>
            </div>
        </div>
    );
}