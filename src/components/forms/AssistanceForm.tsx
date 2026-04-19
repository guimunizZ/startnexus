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
        <div>
            <h1>Cadastro Assistência</h1>

            <input name="businessName" placeholder="Empresa" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
            <input name="cnpj" placeholder="CNPJ" onChange={handleChange} />
            <input name="address" placeholder="Endereço" onChange={handleChange} />
            <textarea name="description" placeholder="Descrição" onChange={handleChange} />

            <input name="experience" type="number" placeholder="Anos de experiência" onChange={handleChange} />

            <label>
                <input type="checkbox" name="isJunior" onChange={handleChange} />
                Sou júnior
            </label>

            <h3>Serviços</h3>
            {services.map((s: any) => (
                <label key={s.id}>
                    <input type="checkbox" onChange={() => toggleService(s.id)} />
                    {s.name}
                </label>
            ))}

            <h3>Logo</h3>
            <input type="file" name="logo" onChange={(e: any) => setForm({ ...form, logo: e.target.files[0] })} />

            <h3>Fotos do espaço</h3>
            <input type="file" name="workspacePhotos" multiple onChange={handleChange} />

            <h3>Certificados</h3>
            <input type="file" name="certificates" multiple onChange={handleChange} />

            <br /><br />

            <button onClick={handleRegister}>
                {loading ? "Cadastrando..." : "Cadastrar Assistência"}
            </button>
        </div>
    );
}