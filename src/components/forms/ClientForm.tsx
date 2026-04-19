"use client";

import { useState, type ChangeEvent } from "react";
import { AuthService } from "@/server/services/authService";

const authService = new AuthService();

export default function ClientForm() {
    const [loading, setLoading] = useState(false);

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

        // validação básica (profissional mínimo)
        if (!form.email || !form.password || !form.firstName) {
            alert("Preencha os campos obrigatórios");
            return;
        }

        setLoading(true);

        try {
            await authService.registerClient(form);
            alert("Cliente cadastrado com sucesso!");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nome</label>
                        <input
                            name="firstName"
                            placeholder="Ex: João"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Sobrenome</label>
                        <input
                            name="lastName"
                            placeholder="Ex: Silva"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="exemplo@email.com"
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
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Endereço Completo</label>
                    <input
                        name="address"
                        placeholder="Rua, número, bairro, cidade"
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                </div>
            </div>

            <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] mt-4"
            >
                {loading ? "Criando conta..." : "Finalizar Cadastro"}
            </button>
        </div>
    );
}