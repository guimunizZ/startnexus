import { supabase } from "@/lib/supabaseClient";

type UserRole = "client" | "assistance";

export class AuthService {
    // ==================================================
    // LOGIN SIMPLES
    // ==================================================
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error("Usuário não encontrado.");

        const role = await this.getUserRole();

        return {
            ...data.user,
            role,
        };
    }

    // ==================================================
    // LOGIN COM VALIDAÇÃO DE ROLE
    // ==================================================
    async loginUser(
        email: string,
        password: string,
        selectedRole: UserRole
    ) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error("Usuário não encontrado.");

        const userId = data.user.id;

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userId)
            .single();

        if (profileError || !profile) {
            await this.logout();
            throw new Error("Perfil não encontrado.");
        }

        const realRole = profile.role as UserRole;

        if (realRole !== selectedRole) {
            await this.logout();

            if (realRole === "assistance") {
                throw new Error(
                    "Esta conta é de Assistência Técnica. Selecione Assistência."
                );
            }

            throw new Error(
                "Esta conta é de Cliente. Selecione Cliente."
            );
        }

        return {
            ...data.user,
            role: realRole,
        };
    }

    // ==================================================
    // CADASTRO CLIENTE
    // ==================================================
    async registerClient(data: any) {
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    role: "client",
                },
            },
        });

        if (error) throw new Error(error.message);

        const user = authData.user;

        if (!user) throw new Error("Erro ao criar conta.");

        // users
        const { error: usersError } = await supabase
            .from("users")
            .upsert({
                id: user.id,
                email: data.email,
                role: "client",
            });

        if (usersError) throw new Error(usersError.message);

        // profiles
        const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                email: data.email,
                role: "client",
            });

        if (profileError) throw new Error(profileError.message);

        // client_profiles
        const { error: insertError } = await supabase
            .from("client_profiles")
            .upsert({
                id: user.id,
                first_name: data.firstName,
                last_name: data.lastName,
                address: data.address,
                city: data.city || null,
                state: data.state || null,
                zipcode: data.zipcode || null,
                bio: data.bio || null,
                avatar_url: data.avatarUrl || null,
                sustainability_points: 0,
                level: 1,
                updated_at: new Date().toISOString(),
            });

        if (insertError) throw new Error(insertError.message);

        return user;
    }

    // ==================================================
    // CADASTRO ASSISTÊNCIA
    // ==================================================
    async registerAssistance(data: any) {
        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    role: "assistance",
                },
            },
        });

        if (error) throw new Error(error.message);

        const user = authData.user;

        if (!user) throw new Error("Erro ao criar conta.");

        // users
        const { error: usersError } = await supabase
            .from("users")
            .upsert({
                id: user.id,
                email: data.email,
                role: "assistance",
            });

        if (usersError) throw new Error(usersError.message);

        // profiles
        const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                email: data.email,
                role: "assistance",
            });

        if (profileError) throw new Error(profileError.message);

        // assistances
        const { error: insertError } = await supabase
            .from("assistances")
            .upsert({
                id: user.id,
                business_name: data.businessName,
                cnpj: data.cnpj,
                email: data.email,
                address: data.address,
                description: data.description || null,
                experience: data.experience || 0,
                is_junior: data.isJunior || false,
                portfolio_url: data.portfolioUrl || null,
                study_time: data.studyTime || null,
                has_tools: data.hasTools || false,
                availability: data.availability || null,
                experience_summary: data.experienceSummary || null,
                services_offered: data.selectedServices || [],
            });

        if (insertError) throw new Error(insertError.message);

        return user;
    }

    // ==================================================
    // EDITAR PERFIL ASSISTÊNCIA
    // ==================================================
    async updateAssistanceProfile(
        userId: string,
        profileData: any
    ) {
        const { error } = await supabase
            .from("assistances")
            .update({
                business_name: profileData.businessName,
                cnpj: profileData.cnpj,
                description: profileData.description,
                logo_url: profileData.logoUrl,
                workspace_photos: profileData.workspacePhotos,
                certificates: profileData.certificates,
                social_proof: profileData.socialProof,
            })
            .eq("id", userId);

        if (error) throw new Error(error.message);
    }

    // ==================================================
    // RESET SENHA
    // ==================================================
    async resetPassword(email: string) {
        const { error } =
            await supabase.auth.resetPasswordForEmail(email);

        if (error) throw new Error(error.message);
    }

    // ==================================================
    // LOGOUT
    // ==================================================
    async logout() {
        await supabase.auth.signOut();

        if (typeof window !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    // ==================================================
    // PEGAR ROLE
    // ==================================================
    async getUserRole() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (error || !data) return null;

        return data.role as UserRole;
    }

    // ==================================================
    // PEGAR USUÁRIO LOGADO
    // ==================================================
    async getCurrentUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        return {
            ...user,
            role: profile?.role,
            profile,
        };
    }
}