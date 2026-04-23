"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CollectionArea from "@/components/dashboard/CollectionArea";
import AssistanceProfile from "@/components/dashboard/AssistanceProfile";
import { AuthService } from "@/client/services/authService";

const authService = new AuthService();

export default function B2CPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async (): Promise<void> => {
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
      } catch (error) {
        console.error(error);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, [router]);

  const handleLogout = async (): Promise<void> => {
    await authService.logout();
    window.location.href = "/";
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="h-12 w-12 rounded-full border-b-2 border-emerald-500 animate-spin" />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-950 text-white">
        <nav className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">

            <Link
                href="/"
                className="flex items-center shrink-0 pt-3 brightness-125 contrast-125"
            >
              <Image
                  src="/logo-dark.png"
                  alt="StartNexus"
                  width={200}
                  height={78}
                  priority
                  className="object-contain drop-shadow-[0_0_18px_rgba(0,245,160,0.18)]"
              />
            </Link>

            <div className="flex items-center gap-5">
              <button
                  onClick={handleLogout}
                  className="text-slate-300 font-bold text-lg"
              >
                Sair
              </button>

              <button className="px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-lg">
                Minha Conta
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <header className="space-y-4">
                <h1 className="text-5xl font-black tracking-tight leading-tight">
                  Como podemos <br />
                  <span className="text-emerald-500">
                  ajudar você hoje?
                </span>
                </h1>

                <p className="text-slate-400 text-lg max-w-2xl">
                  Encontre especialistas para conserto ou solicite coleta ecológica.
                </p>
              </header>

              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black">
                    Assistências Recomendadas
                  </h2>

                  <Link
                      href="/marketplace"
                      className="text-emerald-500 font-bold"
                  >
                    Ver todas →
                  </Link>
                </div>

                <div className="grid gap-6">
                  <AssistanceProfile
                      name="Tech Nexus Solutions"
                      rating={4.9}
                      servicesCount={120}
                      isVerified
                      specialties={["iPhone", "Notebook", "Placa mãe"]}
                  />

                  <AssistanceProfile
                      name="Junior Tech Lab"
                      rating={4.7}
                      servicesCount={34}
                      isVerified
                      isJunior
                      specialties={["Android", "Windows", "Limpeza"]}
                  />
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <CollectionArea />

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5">
                <h3 className="text-xl font-black">Sua Segurança</h3>

                <div className="space-y-4 text-slate-400 text-sm">
                  <p>✓ Técnicos avaliados</p>
                  <p>✓ Garantia nos reparos</p>
                  <p>✓ Pagamento seguro</p>
                </div>
              </div>

              <div className="rounded-3xl p-8 bg-emerald-900/30 border border-emerald-500/20">
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