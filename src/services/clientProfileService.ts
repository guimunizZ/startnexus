// src/services/clientProfileService.ts

import { supabase } from "@/lib/supabaseClient";

export type ClientProfile = {
    id: string;
    first_name: string;
    last_name: string;
    nickname: string | null;
    address: string | null;
    zipcode: string | null;
    avatar_url: string | null;
    wanted_services: string[];
    phone: string | null;
};

/* =====================================
BUSCAR PERFIL
===================================== */
export async function getClientProfile(
    userId: string
): Promise<ClientProfile | null> {
    const { data, error } =
        await supabase
            .from("client_profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle();

    if (error) throw error;

    return data;
}

/* =====================================
CRIAR PERFIL MINIMALISTA
(sem created_at / level / etc)
deixa o banco preencher defaults
===================================== */
export async function createClientProfile(
    userId: string
): Promise<ClientProfile | null> {
    const payload = {
        id: userId,
        first_name: "Usuário",
        last_name: "",
        nickname: null,
        address: null,
        zipcode: null,
        avatar_url: null,
        wanted_services: [],
        phone: null,
    };

    const { error } =
        await supabase
            .from("client_profiles")
            .insert([payload]);

    if (error) {
        console.error(
            "ERRO SUPABASE:",
            JSON.stringify(error)
        );
        throw error;
    }

    return await getClientProfile(
        userId
    );
}

/* =====================================
UPDATE PERFIL
===================================== */
export async function updateClientProfile(
    userId: string,
    payload: any
) {
    const { error } =
        await supabase
            .from("client_profiles")
            .update(payload)
            .eq("id", userId);

    if (error) throw error;
}

/* =====================================
SERVIÇOS
===================================== */
export async function updateWantedServices(
    userId: string,
    items: string[]
) {
    const { error } =
        await supabase
            .from("client_profiles")
            .update({
                wanted_services:
                items,
            })
            .eq("id", userId);

    if (error) throw error;
}

/* =====================================
AVATAR
===================================== */
export async function updateClientAvatar(
    userId: string,
    file: File
) {
    const ext =
        file.name
            .split(".")
            .pop() || "png";

    const path =
        `${userId}/avatar.${ext}`;

    const {
        error: uploadError,
    } =
        await supabase.storage
            .from("avatars")
            .upload(path, file, {
                upsert: true,
            });

    if (uploadError)
        throw uploadError;

    const { data } =
        supabase.storage
            .from("avatars")
            .getPublicUrl(path);

    const { error } =
        await supabase
            .from("client_profiles")
            .update({
                avatar_url:
                data.publicUrl,
            })
            .eq("id", userId);

    if (error) throw error;
}

/* =====================================
REMOVER FOTO
===================================== */
export async function removeClientAvatar(
    userId: string
) {
    await supabase.storage
        .from("avatars")
        .remove([
            `${userId}/avatar.png`,
            `${userId}/avatar.jpg`,
            `${userId}/avatar.jpeg`,
            `${userId}/avatar.webp`,
        ]);

    const { error } =
        await supabase
            .from("client_profiles")
            .update({
                avatar_url: null,
            })
            .eq("id", userId);

    if (error) throw error;
}