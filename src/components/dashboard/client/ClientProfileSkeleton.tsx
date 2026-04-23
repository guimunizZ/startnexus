"use client";

export default function ClientProfileSkeleton() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="h-8 w-40 rounded-xl bg-slate-800 animate-pulse" />
                    <div className="h-12 w-28 rounded-2xl bg-slate-800 animate-pulse" />
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10 space-y-8">
                    {/* avatar */}
                    <div className="flex justify-center">
                        <div className="w-36 h-36 rounded-full bg-slate-800 animate-pulse" />
                    </div>

                    {/* nome */}
                    <div className="flex justify-center">
                        <div className="h-10 w-56 rounded-xl bg-slate-800 animate-pulse" />
                    </div>

                    {/* endereço */}
                    <div className="flex justify-center">
                        <div className="h-6 w-80 rounded-xl bg-slate-800 animate-pulse" />
                    </div>

                    {/* box dispositivos */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="h-7 w-56 rounded-xl bg-slate-800 animate-pulse" />
                            <div className="h-11 w-36 rounded-full bg-slate-800 animate-pulse" />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="h-10 w-36 rounded-full bg-slate-800 animate-pulse" />
                            <div className="h-10 w-40 rounded-full bg-slate-800 animate-pulse" />
                            <div className="h-10 w-32 rounded-full bg-slate-800 animate-pulse" />
                            <div className="h-10 w-44 rounded-full bg-slate-800 animate-pulse" />
                            <div className="h-10 w-28 rounded-full bg-slate-800 animate-pulse" />
                        </div>
                    </div>

                    {/* cards extras */}
                    <div className="grid md:grid-cols-3 gap-5">
                        <div className="h-28 rounded-3xl bg-slate-800 animate-pulse" />
                        <div className="h-28 rounded-3xl bg-slate-800 animate-pulse" />
                        <div className="h-28 rounded-3xl bg-slate-800 animate-pulse" />
                    </div>
                </div>
            </main>
        </div>
    );
}