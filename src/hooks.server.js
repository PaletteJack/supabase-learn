import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const handle = async ({ url, event, resolve }) => {
    event.locals.sb = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    })

    event.locals.getSession = async () => {
        const {
            data: { session },
        } = await event.locals.sb.auth.getSession()
        return session
    }

    const haveSession = await event.locals.getSession()

    if (haveSession) {
        event.locals.userID = haveSession.user.id
    }

    if (event.url.pathname.startsWith('/dashboard')) {
        if (!haveSession) {
            throw redirect('301', '/login')
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name ==='content-range'
        },
    })
}