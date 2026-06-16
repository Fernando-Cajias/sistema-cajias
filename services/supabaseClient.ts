import { createClient } from "@supabase/supabase-js";

// Reemplaza estos valores con las credenciales de tu proyecto en Supabase.
// Los encuentras en: Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = "https://jzthvxsvsuxcluksbnqq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SdCV9hvuDUeMLZ-_JnJGag_N9DLkgWG";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Requerido para React Native / Expo
  },
});
