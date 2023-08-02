import { adminAuthClient } from "$lib/server/supabase-admin.js"
import { fail, redirect, error } from "@sveltejs/kit";

export const load= async ({ locals: { sb, userData } }) => {
    if (!userData.site_admin) {
        throw error(401, {message: "You do not have access to this page"})
    }

    async function getSchools(){
        const { data, error } = await sb
        .from('schools')
        .select('*')

        if (!error) {
            return data
        }

        return null
    }

    return {
        schools: await getSchools()
    }
}

export const actions = {
    createSchool: async ({ request, locals: { sb }}) => {
        const body = Object.fromEntries(await request.formData())

        console.log(body);
    }
};