"use client";

import { useState } from "react";
import { updateClientProfile } from "@/services/clientProfileService";

type Props = {
    userId: string;
    profile: any;
    onCloseAction: () => void;
    onSavedAction: () => void;
};

export default function ClientAddressModal({
                                               userId,
                                               profile,
                                               onCloseAction,
                                               onSavedAction
                                           }: Props) {
    const [zipcode, setZipcode] = useState(
        profile?.zipcode || ""
    );

    const [address, setAddress] = useState(
        profile?.address || ""
    );

    const [loading, setLoading] = useState(false);

    function formatCep(value: string) {
        return value
            .replace(/\D/g, "")
            .slice(0, 8);
    }

    async function save() {
        try {
            setLoading(true);

            await updateClientProfile(userId, {
                zipcode,
                address
            });

            onSavedAction();
            onCloseAction();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black">
                        Editar Endereço
                    </h2>

                    <button
                        onClick={onCloseAction}
                        className="w-10 h-10 rounded-full bg-red-500 text-white font-black"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm text-slate-400">
                            CEP
                        </label>

                        <input
                            value={zipcode}
                            onChange={(e) =>
                                setZipcode(
                                    formatCep(
                                        e.target.value
                                    )
                                )
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-white text-slate-950"
                            placeholder="Somente números"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-slate-400">
                            Endereço
                        </label>

                        <input
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-white text-slate-950"
                            placeholder="Insira seu endereço"
                        />
                    </div>

                    <button
                        onClick={save}
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black"
                    >
                        {loading
                            ? "Salvando..."
                            : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}