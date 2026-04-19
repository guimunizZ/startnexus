"use client";

import React, { useState, useEffect } from "react";
import { AuthService } from "@/server/services/authService";
import { supabase } from "@/lib/supabaseClient";

const authService = new AuthService();

export default function AssistanceForm() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        try {
            await authService.registerAssistance(form);
            alert("Assistência cadastrada!");
        } catch (err: any) {
            alert(err.message);
        }

        setLoading(false);
    }

    return (
        <div className="space-y-8 w-full max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nome da Empresa</label>
                        <input
                            name="businessName"
                            placeholder="Sua Assistência"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Profissional</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="contato@empresa.com"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Senha</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">CNPJ (Opcional)</label>
                        <input
                            name="cnpj"
                            placeholder="00.000.000/0000-00"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Endereço da Loja/Oficina</label>
                        <input
                            name="address"
                            placeholder="Rua, número, bairro"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Anos de Experiência</label>
                        <input
                            name="experience"
                            type="number"
                            placeholder="Ex: 5"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Descrição dos Serviços</label>
                        <textarea
                            name="description"
                            placeholder="Conte um pouco sobre seu trabalho..."
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none h-32 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">Especialidades</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((s: any) => (
                        <label key={s.id} className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:border-emerald-500 transition-all">
                            <input
                                type="checkbox"
                                onChange={() => toggleService(s.id)}
                                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{s.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Logo</label>
                    <div className="relative group">
                        <input
                            type="file"
                            name="logo"
                            onChange={(e: any) => setForm({ ...form, logo: e.target.files[0] })}
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Fotos do Espaço</label>
                    <input
                        type="file"
                        name="workspacePhotos"
                        multiple
                        onChange={handleChange}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Certificados</label>
                    <input
                        type="file"
                        name="certificates"
                        multiple
                        onChange={handleChange}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <input
                    type="checkbox"
                    name="isJunior"
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Sou um assistente júnior (focado em aprendizado e coletas)
                </label>
            </div>

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
            >
                {loading ? "Processando Cadastro..." : "Cadastrar Assistência Profissional"}
            </button>
        </div>
    );
}