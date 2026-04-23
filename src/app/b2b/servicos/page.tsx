// ===============================================
// ChatGPT
// ARQUIVO 2/3
// src/app/b2b/servicos/page.tsx
// ===============================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/assistance/Sidebar";
import Header from "@/components/dashboard/assistance/Header";
import ServicesManager from "@/components/dashboard/assistance/ServicesManager";

import { AuthService } from "@/services/authService";

const authService = new AuthService();

export default function ServicosPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        void init();
    }, []);

    async function init() {
        try {
            const currentUser = await authService.getCurrentUser();

            if (!currentUser) {
                router.replace("/");
                return;
            }

            const role = await authService.getUserRole();

            if (role !== "assistance") {
                router.replace("/b2c");
                return;
            }

            setUser(currentUser);
        } catch (error) {
            console.error(error);
            router.replace("/");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#03111f] flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-b-2 border-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#03111f] via-[#071a2d] to-[#03111f]">
            <Sidebar />

            <main className="flex-1 ml-64 min-h-screen">
                <Header user={user} />

                <div className="p-8 space-y-8">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">
                            Serviços
                        </h1>

                        <p className="text-slate-300 font-bold">
                            Gerencie todos os serviços da sua assistência.
                        </p>
                    </div>

                    {/* MODO LISTA FUNCIONAL */}
                    <ServicesManager fullPage />
                </div>
            </main>
        </div>
    );
}
