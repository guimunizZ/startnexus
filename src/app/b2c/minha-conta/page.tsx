"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/authService";

import {
    getClientProfile,
    createClientProfile
} from "@/services/clientProfileService";

import ClientProfileEditor from "@/components/dashboard/client/ClientProfileEditor";
import ClientProfileSkeleton from "@/components/dashboard/client/ClientProfileSkeleton";

const authService =
    new AuthService();

export default function MinhaContaPage() {
    const router =
        useRouter();

    const [loading, setLoading] =
        useState(true);

    const [userId, setUserId] =
        useState("");

    const [profile, setProfile] =
        useState<any>(null);

    useEffect(() => {
        async function init() {
            try {
                const user =
                    await authService.getCurrentUser();

                if (!user) {
                    router.replace("/");
                    return;
                }

                const role =
                    await authService.getUserRole();

                if (role !== "client") {
                    router.replace("/b2b");
                    return;
                }

                setUserId(user.id);

                let data =
                    await getClientProfile(
                        user.id
                    );

                /* Só cria se realmente não existir */
                if (data === null) {
                    try {
                        await createClientProfile(
                            user.id
                        );
                    } catch (e) {
                        /* ignora duplicado */
                    }

                    data =
                        await getClientProfile(
                            user.id
                        );
                }

                setProfile(data);
            } catch (error) {
                console.error(
                    "Minha Conta:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        init();
    }, [router]);

    if (loading) {
        return (
            <ClientProfileSkeleton />
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Erro ao carregar perfil.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 sticky top-0 z-40 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link
                        href="/b2c"
                        className="text-2xl font-black text-emerald-400"
                    >
                        StartNexus
                    </Link>

                    <Link
                        href="/b2c"
                        className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold"
                    >
                        Voltar
                    </Link>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <ClientProfileEditor
                    userId={userId}
                    profile={profile}
                />
            </main>
        </div>
    );
}