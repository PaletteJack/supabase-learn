import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
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

    const session = await event.locals.getSession();

    let userData
    try {
        const userDataCookie = event.cookies.get('user_data')
        userData = JSON.parse(userDataCookie)
        event.locals.userData = userData;
    } catch (err) {
        console.error('Could not parse userData from cookie');
        event.locals.userData = null
    }

    if (event.url.pathname.startsWith('/dashboard')) {
        if (!userData || !session) {
            throw redirect('301', '/login')
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name ==='content-range'
        },
    })
}

export function handleError({ event, error }) { 
    console.log(`--error--\n\n${error}\n\n--error--`);
    return {
        message: error.message,
    }
}