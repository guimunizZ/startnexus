"use client";

import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onCloseAction: () => void;
};

export default function ReviewModal({
                                        open,
                                        onCloseAction,
                                    }: Props) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (!open) {
            setText("");
        }
    }, [open]);

    if (!open) return null;

    function handleSubmit() {
        onCloseAction();
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-[28px] p-7 shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-white">
                            Sua avaliação
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                            Conte como foi sua experiência.
                        </p>
                    </div>

                    <button
                        onClick={onCloseAction}
                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Textarea */}
                <div className="mt-6">
          <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Deixe aqui sua avaliação..."
              className="w-full h-52 rounded-2xl bg-slate-950 border border-slate-700 p-5 resize-none outline-none focus:border-emerald-500 transition text-white placeholder:text-slate-500"
          />
                </div>

                {/* Footer */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        onClick={onCloseAction}
                        className="h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 transition font-bold text-white"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 transition font-black text-slate-950"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}