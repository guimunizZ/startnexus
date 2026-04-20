"use client";

import React, { useState, useEffect } from "react";
import { AuthService } from "@/server/services/authService";
import { supabase } from "@/lib/supabaseClient";

const authService = new AuthService();

export default function AssistanceForm() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
        businessName: "",
        cnpj: "",
        address: "",
        description: "",
        experience: 0,
        isJunior: false,
        services: [] as string[],
        logo: null as File | null,
        workspacePhotos: [] as File[],
        certificates: [] as File[],
    });

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from("services").select("*");
            setServices(data || []);
        }
        void fetchServices();
    }, []);

    function handleChange(e: any) {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setForm({
                ...form,
                [name]: files ? Array.from(files) : [],
            });
        } else {
            setForm({
                ...form,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    }

    function toggleService(id: string) {
        setForm((prev) => ({
            ...prev,
            services: prev.services.includes(id)
                ? prev.services.filter((s) => s !== id)
                : [...prev.services, id],
        }));
    }

    async function handleRegister() {
        if (loading) return;
        setError("");

        if (!form.email || !form.password || !form.businessName) {
            setError("E-mail, senha e nome da assistência são obrigatórios.");
            return;
        }

        setLoading(true);
        try {
            await authService.registerAssistance(form);
            alert("Cadastro de assistência realizado com sucesso!");
        } catch (err: any) {
            setError(err.message || "Erro ao cadastrar assistência.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 w-full max-w-2xl mx-auto pb-12">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
                    {error}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nome da Assistência</label>
                        <input
                            name="businessName"
                            placeholder="Ex: Tech Nexus Solutions"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail Profissional</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="contato@empresa.com"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">CNPJ (Opcional)</label>
                        <input
                            name="cnpj"
                            placeholder="00.000.000/0000-00"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Endereço da Loja/Oficina</label>
                        <input
                            name="address"
                            placeholder="Rua, número, bairro"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Anos de Experiência</label>
                        <input
                            name="experience"
                            type="number"
                            placeholder="0"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Descrição dos Serviços</label>
                        <textarea
                            name="description"
                            placeholder="Fale sobre suas especialidades e diferencial..."
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none h-32 resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Junior Section */}
            <div className={`p-5 rounded-2xl border transition-all flex items-center space-x-4 ${form.isJunior ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/20' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800'}`}>
                <div className="relative flex items-center justify-center">
                    <input
                        type="checkbox"
                        name="isJunior"
                        checked={form.isJunior}
                        onChange={handleChange}
                        className="w-6 h-6 rounded-lg border-2 border-blue-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                </div>
                <div className="flex-1">
                    <label className={`block font-bold text-sm ${form.isJunior ? 'text-white' : 'text-blue-700 dark:text-blue-400'}`}>
                        Sou Assistente Júnior (Estudante/Iniciante)
                    </label>
                    <p className={`text-xs ${form.isJunior ? 'text-blue-100' : 'text-blue-600/80 dark:text-blue-500/60'}`}>
                        Se você tem curso de hardware ou manutenção e está começando, marque esta opção para suporte especializado.
                    </p>
                </div>
                {form.isJunior && <span className="text-2xl animate-bounce">🚀</span>}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>🛠️</span>
                    <span>Especialidades Técnicas</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((s: any) => (
                        <label key={s.id} className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${form.services.includes(s.id) ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500'}`}>
                            <input
                                type="checkbox"
                                checked={form.services.includes(s.id)}
                                onChange={() => toggleService(s.id)}
                                className="hidden"
                            />
                            <span className="text-sm font-medium">{s.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Logo</label>
                    <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            name="logo"
                            onChange={(e: any) => setForm({ ...form, logo: e.target.files[0] })}
                            className="hidden"
                            id="logo-upload"
                        />
                        <label htmlFor="logo-upload" className="cursor-pointer">
                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🖼️</span>
                            <span className="text-xs text-slate-500 group-hover:text-blue-500">Upload Logo</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Espaço Físico</label>
                    <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            name="workspacePhotos"
                            multiple
                            onChange={handleChange}
                            className="hidden"
                            id="workspace-upload"
                        />
                        <label htmlFor="workspace-upload" className="cursor-pointer">
                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">📸</span>
                            <span className="text-xs text-slate-500 group-hover:text-blue-500">Fotos da Oficina</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Certificações</label>
                    <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            name="certificates"
                            multiple
                            onChange={handleChange}
                            className="hidden"
                            id="cert-upload"
                        />
                        <label htmlFor="cert-upload" className="cursor-pointer">
                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">📜</span>
                            <span className="text-xs text-slate-500 group-hover:text-blue-500">Certificados</span>
                        </label>
                    </div>
                </div>
            </div>

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Processando Cadastro...</span>
                    </>
                ) : (
                    <span>Cadastrar Minha Assistência Profissional</span>
                )}
            </button>
        </div>
    );
}
