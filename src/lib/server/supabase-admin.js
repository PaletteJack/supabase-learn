import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { SUPABASE_SERVICE_KEY } from "$env/static/private"
import { createClient } from "@supabase/supabase-js";

const sb = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

export const adminAuthClient = sb.auth.admin