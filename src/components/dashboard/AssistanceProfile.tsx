"use client";

import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name?: string | null;
    address?: string | null;
    rating?: number | null;
    servicesCount?: number | null;
    totalReviews?: number | null;
    isVerified?: boolean;
    isJunior?: boolean | null;
    specialties?: string[] | null;
}

export default function AssistanceProfile({
                                              id,
                                              name,
                                              address,
                                              rating,
                                              servicesCount,
                                              totalReviews,
                                              isVerified,
                                              isJunior,
                                              specialties,
                                          }: Props) {
    const router = useRouter();

    const safeName = name?.trim() || "Assistência Técnica";
    const safeAddress =
        address?.trim() || "Endereço não informado";

    const safeRating =
        typeof rating === "number" ? rating : 0;

    const safeServicesCount =
        typeof servicesCount === "number"
            ? servicesCount
            : 0;

    const safeTotalReviews =
        typeof totalReviews === "number"
            ? totalReviews
            : 0;

    const safeSpecialties =
        Array.isArray(specialties) &&
        specialties.length > 0
            ? specialties
            : ["Assistência Técnica"];

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:border-emerald-500/30 transition-all">
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex items-start gap-4">
                    <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shrink-0 ${
                            isJunior
                                ? "bg-blue-600"
                                : "bg-emerald-600"
                        }`}
                    >
                        {safeName.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-2xl font-black text-white break-words">
                                {safeName}
                            </h3>

                            {isVerified && (
                                <span className="text-emerald-400 text-sm">
                  ✔
                </span>
                            )}

                            {isJunior && (
                                <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                  Júnior
                </span>
                            )}
                        </div>

                        <p className="text-slate-400 text-sm mt-2 break-words">
                            {safeAddress}
                        </p>
                    </div>
                </div>

                {/* NOTA */}
                <div className="flex items-center gap-3">
                    <div className="text-yellow-400 text-lg">
                        ★★★★★
                    </div>

                    <div className="text-white font-bold">
                        {safeRating > 0
                            ? safeRating.toFixed(1)
                            : "Novo"}
                    </div>

                    <div className="text-slate-400 text-sm">
                        ({safeTotalReviews})
                    </div>
                </div>

                {/* SERVIÇOS */}
                <p className="text-slate-400 text-sm">
                    {safeServicesCount} serviços disponíveis
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                    {safeSpecialties.map((item, index) => (
                        <span
                            key={`${item}-${index}`}
                            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300"
                        >
              {item}
            </span>
                    ))}
                </div>

                {/* BOTÃO */}
                <button
                    onClick={() =>
                        router.push(`/b2c/assistance/${id}`)
                    }
                    className="w-full h-12 rounded-2xl bg-white text-slate-950 font-black hover:bg-slate-200 transition-colors active:scale-[0.98]"
                >
                    Ver Perfil Completo
                </button>
            </div>
        </div>
    );
}