"use client";

import { useState } from "react";
import {
    updateClientProfile
} from "@/services/clientProfileService";

import ClientAvatarModal from "./ClientAvatarModal";
import ClientAddressModal from "./ClientAddressModal";
import ClientWantedServices from "./ClientWantedServices";
import ClientToast from "./ClientToast";

type Props = {
    userId: string;
    profile: any;
};

export default function ClientProfileEditor({
                                                userId,
                                                profile
                                            }: Props) {
    const [data, setData] =
        useState(profile);

    const [showAvatar, setShowAvatar] =
        useState(false);

    const [showAddress, setShowAddress] =
        useState(false);

    const [toast, setToast] =
        useState("");

    const [editingName, setEditingName] =
        useState(false);

    const [name, setName] = useState(
        data.first_name || ""
    );

    async function saveName() {
        await updateClientProfile(
            userId,
            {
                first_name: name
            }
        );

        setData({
            ...data,
            first_name: name
        });

        setEditingName(false);
        setToast(
            "Nome atualizado!"
        );
    }

    function refresh() {
        window.location.reload();
    }

    return (
        <>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 space-y-8">
                {/* FOTO */}
                <div className="flex justify-center">
                    <div className="relative group">
                        {data.avatar_url ? (
                            <img
                                src={
                                    data.avatar_url
                                }
                                alt="avatar"
                                className="w-36 h-36 rounded-full object-cover border-4 border-slate-800"
                            />
                        ) : (
                            <div className="w-36 h-36 rounded-full bg-emerald-500 flex items-center justify-center text-5xl font-black text-slate-950">
                                {data.first_name
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                    "U"}
                            </div>
                        )}

                        <button
                            onClick={() =>
                                setShowAvatar(
                                    true
                                )
                            }
                            className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-2xl"
                        >
                            ✏️
                        </button>
                    </div>
                </div>

                {/* NOME */}
                <div className="text-center">
                    {editingName ? (
                        <div className="flex gap-3 justify-center">
                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target
                                            .value
                                    )
                                }
                                className="px-4 py-3 rounded-2xl bg-white text-slate-950"
                            />

                            <button
                                onClick={
                                    saveName
                                }
                                className="px-5 rounded-2xl bg-emerald-500 text-slate-950 font-black"
                            >
                                Salvar
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3 justify-center items-center">
                            <h1 className="text-4xl font-black">
                                {data.first_name}
                            </h1>

                            <button
                                onClick={() =>
                                    setEditingName(
                                        true
                                    )
                                }
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500"
                            >
                                ✏️
                            </button>
                        </div>
                    )}
                </div>

                {/* ENDEREÇO */}
                <div className="text-center">
                    <div className="inline-flex gap-3 items-center">
                        <p className="text-slate-400">
                            {data.address ||
                                "Sem endereço"}
                        </p>

                        <button
                            onClick={() =>
                                setShowAddress(
                                    true
                                )
                            }
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500"
                        >
                            ✏️
                        </button>
                    </div>
                </div>

                {/* DISPOSITIVOS */}
                <ClientWantedServices
                    userId={userId}
                    currentItems={
                        data.wanted_services ||
                        []
                    }
                    onSavedAction={
                        refresh
                    }
                />
            </div>

            {showAvatar && (
                <ClientAvatarModal
                    userId={userId}
                    onCloseAction={() =>
                        setShowAvatar(
                            false
                        )
                    }
                    onSavedAction={
                        refresh
                    }
                />
            )}

            {showAddress && (
                <ClientAddressModal
                    userId={userId}
                    profile={data}
                    onCloseAction={() =>
                        setShowAddress(
                            false
                        )
                    }
                    onSavedAction={
                        refresh
                    }
                />
            )}

            {toast && (
                <ClientToast
                    message={toast}
                />
            )}
        </>
    );
}