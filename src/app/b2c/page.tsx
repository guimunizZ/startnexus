"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import CollectionArea from "@/components/dashboard/CollectionArea";
import AssistanceProfile from "@/components/dashboard/AssistanceProfile";
import { AuthService } from "@/services/authService";
import { supabase } from "@/lib/supabaseClient";

const authService = new AuthService();

type Assistance = {
    id: string;
    business_name: string;
    address: string;
    is_junior: boolean;
    services_offered: string[];
    avg_rating?: number;
    total_reviews?: number;
};

type Review = {
    assistance_id: string;
    rating: number;
};

export default function B2CPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [assistances, setAssistances] = useState<Assistance[]>([]);

    useEffect(() => {
        const init = async () => {
            try {
                const user = await authService.getCurrentUser();

                if (!user) {
                    router.replace("/");
                    return;
                }

                const role = await authService.getUserRole();

                if (role !== "client") {
                    router.replace("/b2b");
                    return;
                }

                const { data: assistData, error } = await supabase
                    .from("assistances")
                    .select("*");

                if (error || !assistData) {
                    setAssistances([]);
                    return;
                }

                const { data: reviewsData } = await supabase
                    .from("reviews")
                    .select("assistance_id, rating");

                const reviews: Review[] = reviewsData || [];

                const formatted: Assistance[] = assistData.map((item: Assistance) => {
                    const relatedReviews = reviews.filter(
                        (review) => review.assistance_id === item.id
                    );

                    const totalReviews = relatedReviews.length;

                    const avgRating =
                        totalReviews > 0
                            ? relatedReviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                        ) / totalReviews
                            : 0;

                    return {
                        ...item,
                        avg_rating: avgRating,
                        total_reviews: totalReviews,
                    };
                });

                setAssistances(formatted);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [router]);

    const handleLogout = async () => {
        await authService.logout();
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-b-2 border-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/logo-dark.png"
                            alt="StartNexus"
                            width={180}
                            height={70}
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-5">
                        <button
                            onClick={handleLogout}
                            className="text-slate-300 font-bold text-lg"
                        >
                            Sair
                        </button>

                        <Link
                            href="/b2c/minha-conta"
                            className="px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-lg"
                        >
                            Minha Conta
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        <header className="space-y-4">
                            <h1 className="text-5xl font-black leading-tight">
                                Como podemos <br />
                                <span className="text-emerald-500">
                  ajudar você hoje?
                </span>
                            </h1>

                            <p className="text-slate-400 text-lg">
                                Encontre especialistas confiáveis perto de você.
                            </p>
                        </header>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black">
                                Assistências Recomendadas
                            </h2>

                            <div className="grid gap-6">
                                {assistances.map((item) => (
                                    <AssistanceProfile
                                        key={item.id}
                                        id={item.id}
                                        name={item.business_name}
                                        address={item.address}
                                        rating={item.avg_rating || 0}
                                        totalReviews={item.total_reviews || 0}
                                        servicesCount={
                                            item.services_offered?.length || 0
                                        }
                                        isVerified
                                        isJunior={item.is_junior}
                                        specialties={
                                            item.services_offered?.length
                                                ? item.services_offered
                                                : ["Assistência Técnica"]
                                        }
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <CollectionArea />

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5">
                            <h3 className="text-xl font-black">
                                Sua Segurança
                            </h3>

                            <div className="space-y-4 text-slate-400 text-sm">
                                <p>✓ Técnicos avaliados</p>
                                <p>✓ Garantia nos reparos</p>
                                <p>✓ Pagamento seguro</p>
                            </div>
                        </div>

                        <div className="rounded-3xl p-8 bg-emerald-900/20 border border-emerald-500/20">
                            <h3 className="text-emerald-400 font-black mb-3">
                                Dica Nexus Eco
                            </h3>

                            <p className="text-slate-300 text-sm">
                                Faça descarte eletrônico e ganhe pontos para descontos.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}