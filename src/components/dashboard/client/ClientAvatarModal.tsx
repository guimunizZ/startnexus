"use client";

import { useRef, useState } from "react";
import {
    updateClientAvatar,
    removeClientAvatar
} from "@/services/clientProfileService";

type Props = {
    userId: string;
    onCloseAction: () => void;
    onSavedAction: () => void;
};

export default function ClientAvatarModal({
                                              userId,
                                              onCloseAction,
                                              onSavedAction
                                          }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    async function upload(file?: File) {
        if (!file) return;

        try {
            setLoading(true);

            await updateClientAvatar(userId, file);

            onSavedAction();
            onCloseAction();
        } finally {
            setLoading(false);
        }
    }

    async function remove() {
        try {
            setLoading(true);

            await removeClientAvatar(userId);

            onSavedAction();
            onCloseAction();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">
                <div className="flex justify-between mb-8">
                    <h2 className="text-2xl font-black">
                        Foto de Perfil
                    </h2>

                    <button
                        onClick={onCloseAction}
                        className="w-10 h-10 rounded-full bg-red-500 text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={remove}
                        className="w-16 h-16 rounded-full bg-slate-800 hover:bg-red-500 text-2xl"
                    >
                        🗑️
                    </button>

                    <button
                        onClick={() =>
                            fileRef.current?.click()
                        }
                        className="w-16 h-16 rounded-full bg-slate-800 hover:bg-emerald-500 text-2xl"
                    >
                        📎
                    </button>
                </div>

                <input
                    ref={fileRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        upload(
                            e.target.files?.[0]
                        )
                    }
                />

                {loading && (
                    <p className="text-center mt-6 text-slate-400">
                        Processando...
                    </p>
                )}
            </div>
        </div>
    );
}