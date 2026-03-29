"use server"; 

import { createClient } from "@/lib/supabase/server";

export async function exportCSV(organizationId: string) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from("transactions")
        .select()
        .eq("org_id", organizationId);

    if(error) {
        return { error: error.message };
    }

    return { data };
}



