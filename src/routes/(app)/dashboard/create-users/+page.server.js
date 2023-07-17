import { adminAuthClient } from "$lib/server/supabase-admin.js"
import { fail, redirect, error } from "@sveltejs/kit";

export const load= async ({ locals: { userData } }) => {
    if (!userData.site_admin) {
        throw error(401, {message: "You do not have access to this page"})
    }
}

export const actions = {
    createUser: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());

        const { data, error } = await adminAuthClient.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
        })

        if (data) {
            console.log(data);
            return{
                message: 'successfully created user'
            }
        }

        if (error) {
            return fail(500, {
                message: error.message
            })
        }
        
    }
};