import { supabase } from "@/lib/supabaseClient";

export class AuthService {

    // =========================
    // REGISTER CLIENT
    // =========================
    async registerClient(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        address: string;
    }) {

        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) throw new Error(error.message);

        const userId = authData.user!.id;

        // tabela users
        await supabase.from("users").insert({
            id: userId,
            email: data.email,
            role: "client",
        });

        // tabela clients
        await supabase.from("clients").insert({
            id: userId,
            first_name: data.firstName,
            last_name: data.lastName,
            address: data.address,
        });

        return userId;
    }


    // =========================
    // REGISTER ASSISTANCE
    // =========================
    async registerAssistance(data: {
        email: string;
        password: string;
        businessName: string;
        description: string;
        cnpj?: string;
        address: string;
        experience: number;
        isJunior: boolean;
        services: string[];
        logo: File | null;
        workspacePhotos: File[];
        certificates: File[];
    }) {

        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) throw new Error(error.message);

        const userId = authData.user!.id;

        await supabase.from("users").insert({
            id: userId,
            email: data.email,
            role: "assistance",
        });

        await supabase.from("assistances").insert({
            id: userId,
            business_name: data.businessName,
            description: data.description,
            cnpj: data.cnpj,
            address: data.address,
            experience_years: data.experience,
            is_junior: data.isJunior,
        });

        return userId;
    }

    // =========================
    // LOGIN
    // =========================
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        return data.user;
    }
}