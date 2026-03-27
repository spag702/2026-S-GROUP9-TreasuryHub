"use server";

import { createClient } from "@/lib/supabase/server";

export async function fetchTransactions() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('transactions')
      .select('*');

    if (error) {
      console.error('Database error:', error.message);
      throw new Error('Failed to fetch transaction.');
    }
    return data;
}
