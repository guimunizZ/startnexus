"use client";

import { useState, type ChangeEvent } from "react";
import { AuthService } from "@/services/authService";

const authService = new AuthService();

export default function ClientForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleRegister() {
        if (loading) return;
        setError("");

        if (!form.email || !form.password || !form.firstName) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setLoading(true);

        try {
            await authService.registerClient(form);
            alert("Conta de cliente criada com sucesso!");
            // Redirecionar para login ou b2c
        } catch (err: any) {
            setError(err.message || "Erro ao criar conta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6 w-full max-w-md mx-auto">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nome</label>
                        <input
                            name="firstName"
                            placeholder="João"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Sobrenome</label>
                        <input
                            name="lastName"
                            placeholder="Silva"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Endereço Completo</label>
                    <input
                        name="address"
                        placeholder="Rua, número, bairro, cidade"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                </div>
            </div>

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] mt-4 flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Criando sua conta...</span>
                    </>
                ) : (
                    <span>Finalizar Cadastro de Cliente</span>
                )}
            </button>
        </div>
    );
}
