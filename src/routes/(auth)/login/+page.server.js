import { fail, redirect } from '@sveltejs/kit';
import { cookieSettings } from '$lib/utils.js';

export const load = async ({ locals: { getSession } }) => {
    const session = await getSession()
    if (session) {
        throw redirect(303, '/dashboard')
    }

}

export const actions = {
    login: async ({ cookies, request, locals: { sb } }) => {
        const { email, password } = Object.fromEntries(await request.formData())
        
        const { data, error } = await sb.auth.signInWithPassword({
            email,
            password
        })

        if (data) {
            const { data: userData, error: err } = await sb.from('user_data').select().eq('id', data.user.id).limit(1).single();
            cookies.set('user_data', JSON.stringify(userData), cookieSettings)
            throw redirect(303, '/dashboard')
        }

        if (error) {
            return fail(401, {
                message: "Could not sign in. Check your username and password."
            })
        }

    }
};