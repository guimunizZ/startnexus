"use client";

type Props = {
    message: string;
};

export default function ClientToast({
                                        message
                                    }: Props) {
    if (!message) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] animate-fade-in-up">
            <div className="px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-white font-semibold">
                {message}
            </div>
        </div>
    );
}