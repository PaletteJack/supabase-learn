import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
    const session = await getSession()
    console.log(session);
    if (session) {
        throw redirect(303, '/dashboard')
    }

}

export const actions = {
    login: async ({ request, locals: { sb } }) => {
        const { email, password } = Object.fromEntries(await request.formData())
        
        const { data, error } = await sb.auth.signInWithPassword({
            email,
            password
        })
    }
};