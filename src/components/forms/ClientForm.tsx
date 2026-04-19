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
        <div style={{ padding: 20 }}>
            <h1>Cadastro Cliente</h1>

            <input name="firstName" placeholder="Nome" onChange={handleChange} />
            <input name="lastName" placeholder="Sobrenome" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
            <input name="address" placeholder="Endereço" onChange={handleChange} />

            <br /><br />

            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar Cliente"}
            </button>
        </div>
    );
}