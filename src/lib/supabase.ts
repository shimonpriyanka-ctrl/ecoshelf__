import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function createSafeClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase env vars missing — running in offline mode");
    return null;
  }
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error("Failed to create Supabase client:", err);
    return null;
  }
}

export const supabase = createSafeClient();
