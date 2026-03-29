"use server"; 

import { createClient } from "@/lib/supabase/server";

export async function exportCSV() {
    const supabase = await createClient();

    const {data: { user }, error: authError} = await supabase.auth.getUser();
    if (authError || !user) {
        return { error: "Unauthorized" };
    }

    const {data: org_members, error: orgError} = await supabase
        .from("org_members")
        .select("org_id")
        .eq("user_id", user.id)
        .single();

    if(orgError || !org_members) {
        return { error: "Organization not found" };
    }

    const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("org_id", org_members.org_id);
    if (error) {
        return { error: "Failed to fetch transactions" };
    }

    return { data };
}



