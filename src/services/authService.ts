import { supabase } from "@/lib/supabaseClient";

type UserRole = "client" | "assistance";

export class AuthService {
    // ==========================================
    // CACHE DE USUÁRIO (evita múltiplos getUser)
    // ==========================================
    private cachedUser: any = null;
    private cacheTime = 0;

    private async getSafeUser() {
        const now = Date.now();

        if (
            this.cachedUser &&
            now - this.cacheTime < 3000
        ) {
            return this.cachedUser;
        }

        const {
            data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user ?? null;

        this.cachedUser = user;
        this.cacheTime = now;

        return user;
    }

    clearCache() {
        this.cachedUser = null;
        this.cacheTime = 0;
    }

    // ==========================================
    // LOGIN SIMPLES
    // ==========================================
    async login(email: string, password: string) {
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) throw new Error(error.message);
        if (!data.user)
            throw new Error("Usuário não encontrado.");

        this.clearCache();

        const role = await this.getUserRole();

        return {
            ...data.user,
            role,
        };
    }

    // ==========================================
    // LOGIN COM ROLE
    // ==========================================
    async loginUser(
        email: string,
        password: string,
        selectedRole: UserRole
    ) {
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (error) throw new Error(error.message);
        if (!data.user)
            throw new Error("Usuário não encontrado.");

        this.clearCache();

        const userId = data.user.id;

        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", userId)
                .maybeSingle();

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

    // ==========================================
    // CADASTRO CLIENTE
    // ==========================================
    async registerClient(data: any) {
        const { data: authData, error } =
            await supabase.auth.signUp({
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

        if (!user)
            throw new Error("Erro ao criar conta.");

        await supabase.from("users").upsert({
            id: user.id,
            email: data.email,
            role: "client",
        });

        await supabase.from("profiles").upsert({
            id: user.id,
            email: data.email,
            role: "client",
        });

        await supabase.from("client_profiles").upsert({
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

        return user;
    }

    // ==========================================
    // CADASTRO ASSISTÊNCIA
    // ==========================================
    async registerAssistance(data: any) {
        const { data: authData, error } =
            await supabase.auth.signUp({
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

        if (!user)
            throw new Error("Erro ao criar conta.");

        await supabase.from("users").upsert({
            id: user.id,
            email: data.email,
            role: "assistance",
        });

        await supabase.from("profiles").upsert({
            id: user.id,
            email: data.email,
            role: "assistance",
        });

        await supabase.from("assistances").upsert({
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
            experience_summary:
                data.experienceSummary || null,
            services_offered:
                data.selectedServices || [],
        });

        return user;
    }

    // ==========================================
    // EDITAR PERFIL ASSISTÊNCIA
    // ==========================================
    async updateAssistanceProfile(
        userId: string,
        profileData: any
    ) {
        const { error } = await supabase
            .from("assistances")
            .update({
                business_name:
                profileData.businessName,
                cnpj: profileData.cnpj,
                description:
                profileData.description,
                logo_url: profileData.logoUrl,
                workspace_photos:
                profileData.workspacePhotos,
                certificates:
                profileData.certificates,
                social_proof:
                profileData.socialProof,
            })
            .eq("id", userId);

        if (error)
            throw new Error(error.message);
    }

    // ==========================================
    // RESET SENHA
    // ==========================================
    async resetPassword(email: string) {
        const { error } =
            await supabase.auth.resetPasswordForEmail(
                email
            );

        if (error)
            throw new Error(error.message);
    }

    // ==========================================
    // LOGOUT
    // ==========================================
    async logout() {
        await supabase.auth.signOut();
        this.clearCache();

        if (typeof window !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    // ==========================================
    // PEGAR ROLE
    // ==========================================
    async getUserRole() {
        const user = await this.getSafeUser();

        if (!user) return null;

        const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();

        if (error || !data) return null;

        return data.role as UserRole;
    }

    // ==========================================
    // PEGAR USUÁRIO LOGADO
    // ==========================================
    async getCurrentUser() {
        const user = await this.getSafeUser();

        if (!user) return null;

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

        return {
            ...user,
            role: profile?.role || null,
            profile: profile || null,
        };
    }
}