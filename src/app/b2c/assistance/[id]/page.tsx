"use client";

// src/app/b2c/assistance/[id]/page.tsx

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";
import PublicAssistanceHero from "@/components/marketplace/PublicAssistanceHero";
import PublicServiceCard from "@/components/marketplace/PublicServiceCard";

type Assistance = {
    id: string;
    business_name: string;
    address: string;
    description: string;
    experience: number;
    is_junior: boolean;
    services_offered: string[];
};

type Review = {
    id: string;
    client_id: string;
    rating: number;
    comment: string;
    created_at: string;
    client_profiles?: {
        first_name: string;
        last_name: string;
        avatar_url: string;
    };
};

type ServiceItem = {
    title: string;
    description: string;
    price: number;
    time: string;
    icon: string;
};

export default function PublicAssistancePage() {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [assistance, setAssistance] =
        useState<Assistance | null>(null);

    const [reviews, setReviews] = useState<
        Review[]
    >([]);

    const [avgRating, setAvgRating] =
        useState(0);

    const [userId, setUserId] =
        useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const id = params?.id as string;

                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (user) {
                    setUserId(user.id);
                }

                // assistência
                const { data, error } =
                    await supabase
                        .from("assistances")
                        .select("*")
                        .eq("id", id)
                        .single();

                if (error || !data) {
                    router.push("/b2c");
                    return;
                }

                setAssistance(data);

                // reviews
                const { data: reviewData } =
                    await supabase
                        .from("reviews")
                        .select("*")
                        .eq("assistance_id", id)
                        .order("created_at", {
                            ascending: false,
                        });

                const finalReviews =
                    reviewData || [];

                setReviews(finalReviews);

                if (finalReviews.length > 0) {
                    const total =
                        finalReviews.reduce(
                            (sum, item) =>
                                sum + item.rating,
                            0
                        );

                    setAvgRating(
                        total /
                        finalReviews.length
                    );
                }
            } catch (error) {
                console.error(error);
                router.push("/b2c");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-b-2 border-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!assistance) return null;

    const services: ServiceItem[] =
        assistance.services_offered
            ?.length > 0
            ? assistance.services_offered.map(
                (item: string) => ({
                    title: item,
                    description:
                        "Serviço profissional realizado pela assistência.",
                    price: 0,
                    time: "Consultar",
                    icon: "tool",
                })
            )
            : [
                {
                    title:
                        "Assistência Técnica",
                    description:
                        "Entre em contato para orçamento.",
                    price: 0,
                    time: "Consultar",
                    icon: "tool",
                },
            ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* NAV */}
            <nav className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950/95 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link
                        href="/b2c"
                        className="font-black text-2xl text-emerald-400"
                    >
                        StartNexus
                    </Link>

                    <Link
                        href="/b2c"
                        className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold"
                    >
                        Voltar
                    </Link>
                </div>
            </nav>

            {/* CONTEÚDO */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                <PublicAssistanceHero
                    assistanceId={
                        assistance.id
                    }
                    name={
                        assistance.business_name
                    }
                    rating={avgRating}
                    reviews={reviews.length}
                    verified={true}
                    junior={
                        assistance.is_junior
                    }
                    servicesCount={
                        services.length
                    }
                    address={
                        assistance.address
                    }
                    description={
                        assistance.description
                    }
                />

                {/* serviços */}
                <section className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black">
                            Serviços Disponíveis
                        </h2>

                        <span className="text-slate-400 text-sm">
              {services.length} serviços
            </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {services.map(
                            (
                                service,
                                index
                            ) => (
                                <PublicServiceCard
                                    key={index}
                                    service={
                                        service
                                    }
                                />
                            )
                        )}
                    </div>
                </section>

                {/* avaliações */}
                <section className="space-y-5">
                    <h2 className="text-3xl font-black">
                        Avaliações
                    </h2>

                    {reviews.length === 0 && (
                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
                            Ainda não existem avaliações.
                        </div>
                    )}

                    <div className="space-y-4">
                        {reviews.map(
                            (item) => {
                                const isMine =
                                    item.client_id ===
                                    userId;

                                return (
                                    <div
                                        key={
                                            item.id
                                        }
                                        className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-slate-950">
                                                    U
                                                </div>

                                                <div>
                                                    <p className="font-bold text-white">
                                                        Usuário
                                                    </p>

                                                    <div className="text-yellow-400 text-sm mt-1">
                                                        {"★".repeat(
                                                            item.rating
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {isMine && (
                                                <span className="text-slate-400">
                          ✏️
                        </span>
                                            )}
                                        </div>

                                        {item.comment && (
                                            <p className="mt-4 text-slate-300 leading-relaxed">
                                                {
                                                    item.comment
                                                }
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}