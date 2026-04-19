import { supabase } from "@/lib/supabaseClient";

export class UserRepository {
    async createUser(user: {
        id: string;
        name: string;
        email: string;
        role: string;
    }) {
        const { error } = await supabase
            .from("users")
            .insert([user]);

        if (error) {
            throw new Error(error.message);
        }
    }
}