import { adminAuthClient } from "$lib/server/supabase-admin.js"
import { fail } from "@sveltejs/kit";

export const actions = {
    createUser: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());

        const { data, error } = await adminAuthClient.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
            user_metadata: {name: `${body.firstName} ${body.lastName}`}
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