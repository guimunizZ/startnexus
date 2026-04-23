"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/assistance/Sidebar";
import Header from "@/components/dashboard/assistance/Header";
import StatsCards from "@/components/dashboard/assistance/StatsCards";
import OrdersList from "@/components/dashboard/assistance/OrdersList";
import ScheduleManager from "@/components/dashboard/assistance/ScheduleManager";
import ServicesManager from "@/components/dashboard/assistance/ServicesManager";
import CompletionCard from "@/components/dashboard/assistance/CompletionCard";

import { AuthService } from "@/client/services/authService";

const authService = new AuthService();

export default function B2BPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    void init(); // ✅ corrige Promise returned from init is ignored
  }, []);

  async function init(): Promise<void> {
    try {
      const currentUser = await authService.getCurrentUser();

      if (!currentUser) {
        void router.replace("/");
        return;
      }

      const role = await authService.getUserRole();

      if (role !== "assistance") {
        void router.replace("/b2c");
        return;
      }

      setUser(currentUser);
    } catch (error) {
      console.error(error);
      void router.replace("/");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#03111f]">
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter">
                  Painel de Controle
                </h1>

                <p className="text-slate-300 font-bold">
                  Gerencie sua assistência técnica.
                </p>
              </div>
            </div>

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <OrdersList />
                <ServicesManager />
              </div>

              <div className="space-y-8">
                <CompletionCard />
                <ScheduleManager />
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
