"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Save, User, MapPin, Phone, Mail, Award } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    bio: "",
    avatarUrl: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const roleTable = profile?.role === "client" ? "clients" : "assistances";
      const { data: roleData } = await supabase
        .from(roleTable)
        .select("*")
        .eq("id", user.id)
        .single();

      setUser(user);
      setFormData({
        nickname: profile?.nickname || "",
        firstName: roleData?.first_name || "",
        lastName: roleData?.last_name || "",
        phone: roleData?.phone || "",
        address: roleData?.address || "",
        bio: roleData?.description || "",
        avatarUrl: profile?.avatar_url || "",
      });
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setSaving(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatarUrl: publicUrl }));
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer upload da foto.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      
      // Update Profiles
      await supabase.from("profiles").update({
        nickname: formData.nickname,
      }).eq("id", user.id);

      // Update Role Table
      const roleTable = profile?.role === "client" ? "clients" : "assistances";
      const updateData: any = {
        address: formData.address,
      };

      if (profile?.role === "client") {
        updateData.first_name = formData.firstName;
        updateData.last_name = formData.lastName;
      } else {
        updateData.description = formData.bio;
      }

      await supabase.from(roleTable).update(updateData).eq("id", user.id);
      
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar: Avatar */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={60} className="text-slate-300" />
                  )}
                </div>
                <label className="absolute bottom-2 right-2 p-3 bg-black text-white rounded-full cursor-pointer hover:bg-slate-800 transition-all shadow-lg active:scale-90">
                  <Camera size={20} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                </label>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold text-slate-900">{formData.nickname || "Seu Nickname"}</h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>

              <div className="w-full mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Sustentabilidade</span>
                  <span className="text-sm font-bold text-emerald-600">🌱 Nível 2</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FF88] w-2/3" />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Faltam 40 pontos para o próximo nível.</p>
              </div>
            </div>
          </div>

          {/* Main: Form */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Configurações de Perfil</h1>
                <p className="text-sm text-slate-500 mt-1">Gerencie suas informações públicas e privadas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nickname</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] transition-all"
                      placeholder="Como quer ser chamado"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      disabled
                      value={user?.email}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nome</label>
                  <input 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Sobrenome</label>
                  <input 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Endereço</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] transition-all"
                    placeholder="Cidade, Estado, Bairro..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Bio / Descrição</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 text-sm outline-none focus:bg-white focus:border-[#00FF88] transition-all h-32 resize-none"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-black text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Save size={18} />
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
