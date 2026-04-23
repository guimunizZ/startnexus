"use client";

type Props = {
    open: boolean;
    onCloseAction: () => void;
};

export default function ReviewModal({
                                        open,
                                        onCloseAction,
                                    }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-[28px] p-7 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black">Sua avaliação</h3>

                    <button
                        onClick={onCloseAction}
                        className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700"
                    >
                        ✕
                    </button>
                </div>

                <textarea
                    placeholder="Deixe aqui sua avaliação..."
                    className="mt-6 w-full h-52 rounded-2xl bg-slate-950 border border-slate-700 p-5 resize-none outline-none focus:border-emerald-500 text-white"
                />

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onCloseAction}
                        className="flex-1 h-12 rounded-2xl bg-slate-800 font-bold"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onCloseAction}
                        className="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-slate-950"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}