"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/client/services/authService";
import { supabase } from "@/lib/supabaseClient";

const authService = new AuthService();

type UserType = {
  id: string;
};

type ProfileType = {
  businessName: string;
  cnpj: string;
  description: string;
  logoUrl: string;
  selectedServices: string[];
  manualServices: unknown[];
  certificates: any[];
  socialProof: any[];
};

export default function EditProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const [profile, setProfile] = useState<ProfileType>({
    businessName: "",
    cnpj: "",
    description: "",
    logoUrl: "",
    selectedServices: [],
    manualServices: [],
    certificates: [],
    socialProof: [],
  });

  useEffect(() => {
    void checkUser(); // ✅ corrige Promise ignored
  }, []);

  async function checkUser(): Promise<void> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        void router.push("/");
        return;
      }

      const { data: assistance } = await supabase
          .from("assistances")
          .select("*")
          .eq("id", user.id)
          .single();

      if (!assistance) {
        void router.push("/b2c");
        return;
      }

      setUser({ id: user.id });

      setProfile({
        businessName: assistance.business_name ?? "",
        cnpj: assistance.cnpj ?? "",
        description: assistance.description ?? "",
        logoUrl: assistance.logo_url ?? "",
        selectedServices: assistance.services_offered ?? [],
        manualServices: [],
        certificates: assistance.certificates ?? [],
        socialProof: assistance.social_proof ?? [],
      });
    } catch (error) {
      console.error(error);
      void router.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(): Promise<void> {
    if (!user) return;

    try {
      setSaving(true);

      await authService.updateAssistanceProfile(user.id, profile);

      void router.push("/b2b");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-b-2 border-emerald-500 animate-spin" />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-end gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Edição de Perfil
              </h1>

              <p className="text-slate-500 mt-1">
                Configure como sua assistência aparecerá no Market Feed.
              </p>
            </div>

            <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="bg-black text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar e Finalizar"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-32 h-32 bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                    {profile.logoUrl ? (
                        <img
                            src={profile.logoUrl}
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-slate-400 text-sm font-bold">
                      LOGO
                    </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {profile.businessName || "Sua Assistência"}
                    </h3>

                    <p className="text-xs text-slate-400">
                      ID: {user?.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                      value={profile.cnpj}
                      onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            cnpj: e.target.value,
                          }))
                      }
                      placeholder="CNPJ"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
                  />

                  <textarea
                      value={profile.description}
                      onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                      }
                      placeholder="Descrição"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none h-28 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Certificados
                </h2>

                {profile.certificates.length === 0 ? (
                    <p className="text-sm text-slate-400">
                      Nenhum certificado cadastrado.
                    </p>
                ) : (
                    <div className="space-y-3">
                      {profile.certificates.map((cert, index) => (
                          <div
                              key={index}
                              className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                          >
                            <p className="font-bold text-sm">{cert.name}</p>
                            <p className="text-xs text-slate-500">
                              {cert.institution}
                            </p>
                          </div>
                      ))}
                    </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Portfólio
                </h2>

                <p className="text-sm text-slate-400">
                  Área preparada para futuras fotos e provas sociais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}