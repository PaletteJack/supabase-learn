import { fail } from '@sveltejs/kit';
import { adminAuthClient } from '$lib/server/supabase-admin.js';

export const load = async ({ params, locals: { sb, userData }}) => {

    const id = userData.id
    const schoolID = await Number(params.school);

    async function getSchoolUsers() {
        const { data, error } = await sb
        .from('user_data')
        .select(`
        id,
        first_name,
        last_name,
        role
        `)
        .eq('school', schoolID)
        .neq('id', id)

        if (!error) {
            return data
        }

        return null
    }

    return {
        schoolUsers: await getSchoolUsers()
    }

}

export const actions = {
    createUser: async ({ request }) => {
        const body = Object.fromEntries(await request.formData());
        let isAdmin;
        if (body.role == 'Site Admin') {
            isAdmin = true
            body.role = "Admin"
        }

        const { data, error } = await adminAuthClient.createUser({
            email: body.email,
            password: body.password,
            email_confirm: true,
            user_metadata: {
                first_name: body.firstName,
                last_name: body.lastName,
                role: body.role,
                school: Number(body.school),
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
    },

    bulkCreate: async ({ request, locals: { sb }}) => {
        const body = Object.fromEntries(await request.formData())
        const schoolID = body.school;
        const data = JSON.parse(body.parsedData)
        const dataList = []

        data.forEach((row) => {
            const userObject = {
                email: row.email,
                password: row.password,
                meta_data: {
                    role: row.role,
                    school: schoolID,
                    last_name: row.lastName,
                    first_name: row.firstName,
                    site_admin: false
                }
            }

            dataList.push(userObject);
        })

        const { error: err } = await sb
        .rpc('create_users', { users: dataList})

        if(!err) {
            return {
                message: "Users created successfully"
            }
        }

        console.error("Could not upload users: ", err);
        return fail(500, {
            message: `Something went wrong. ${err.message}`
        })

    },
    
    deleteUser: async ({ request }) => {
        const body =  Object.fromEntries(await request.formData())
        console.log(body);
    },
};