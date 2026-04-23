"use client";

import { useState } from "react";
import ClientServicesModal from "./ClientServicesModal";
import ClientServiceTags from "./ClientServiceTags";

type Props = {
    userId: string;
    currentItems: string[];
    onSavedAction: () => void;
};

export default function ClientWantedServices({
                                                 userId,
                                                 currentItems,
                                                 onSavedAction
                                             }: Props) {
    const [open, setOpen] =
        useState(false);

    return (
        <>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-black">
                        Dispositivos Buscados
                    </h3>

                    <button
                        onClick={() =>
                            setOpen(true)
                        }
                        className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold"
                    >
                        O que procura
                    </button>
                </div>

                <div className="flex flex-wrap gap-3">
                    {currentItems &&
                    currentItems.length >
                    0 ? (
                        currentItems.map(
                            (
                                item,
                                index
                            ) => (
                                <ClientServiceTags
                                    key={
                                        index
                                    }
                                    label={
                                        item
                                    }
                                />
                            )
                        )
                    ) : (
                        <p className="text-slate-500 text-sm">
                            Nenhum item adicionado.
                        </p>
                    )}
                </div>
            </div>

            {open && (
                <ClientServicesModal
                    userId={userId}
                    currentItems={
                        currentItems ||
                        []
                    }
                    onCloseAction={() =>
                        setOpen(
                            false
                        )
                    }
                    onSavedAction={
                        onSavedAction
                    }
                />
            )}
        </>
    );
}