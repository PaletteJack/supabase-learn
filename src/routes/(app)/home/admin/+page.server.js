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

    async function getTeachers() {
        const { data, error } = await sb
        .from('user_data')
        .select(`
        id,
        first_name,
        last_name,
        school ( id, name, domain )`)
        .eq('role', 'Teacher')

        if (!error) {
            return data
        }

        return null
    }

    return {
        teachers: await getTeachers(),
        schools: await getSchools()
    }
}

export const actions = {
    addImage: async ({ request, locals: { sb } }) => {
        const body = Object.fromEntries(await request.formData());
        let imageLink = "https://epalnbncirlkzxastmpe.supabase.co/storage/v1/object/public/link-icons/"
        const file = body.file

        const { data, error} = await sb
        .storage
        .from('link-icons')
        .upload(`${file.name}`, file, {
            cacheControl: "3600",
            upsert: false
        })

        if (data) {
            imageLink = imageLink + data.path
            console.log(imageLink);
        }
    },

    createUser: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        const school = 1
        const isAdmin = (body.role == 'Site Admin')

        const { data, error } = await adminAuthClient.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
            user_metadata: {
                first_name: body.firstName,
                last_name: body.lastName,
                role: body.role,
                school: school,
                site_admin: isAdmin
            }
        })

        if (!error) {
            console.log(data);
            return{
                message: 'Successfully created user'
            }
        }
        console.log(error);

        return fail(500, {
            message: error.message
        })
        
    },

    createClassroom: async ({ request, locals: { sb } }) => {
        const body = Object.fromEntries(await request.formData());

        const { data, error: err } = await sb
        .from('classrooms')
        .insert({name: body.name, owner: body.owner, school: Number(body.school)})
        .select()

        if (!err) {
            return {
                message: 'Classroom Created'
            }
        }

        return fail(500, {
            message: "Something went wrong. Refresh and try again"
        })
    }
};