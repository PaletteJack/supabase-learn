import { fail, redirect } from '@sveltejs/kit';
import { cookieSettings } from '$lib/utils.js';

export const load = async ({ locals: { getSession, userData } }) => {
    const session = await getSession()
    if (session && userData) {
        throw redirect(303, '/home')
    }

}

export const actions = {
    login: async ({ cookies, request, locals: { sb } }) => {
        const { email, password } = Object.fromEntries(await request.formData())
        
        const { data, error } = await sb.auth.signInWithPassword({
            email,
            password
        })

        if (data.user) {
            const { data: userData, error: err } = await sb
            .from('user_data')
            .select(`
                id,
                first_name,
                last_name,
                role,
                site_admin,
                school ( id, name, domain)
             `)
            .eq('id', data.user.id)
            .limit(1)
            .single();

            cookies.set('user_data', JSON.stringify(userData), cookieSettings)
            throw redirect(303, '/home')
        }

        if (!data.user) {
            return {
                error: true,
                message: "Username or password incorrect"
            }
        }

        return {
            error: true,
            message: "Server Error"
        }

    }
};