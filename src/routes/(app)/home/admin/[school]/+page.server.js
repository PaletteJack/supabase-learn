import { error } from '@sveltejs/kit';

export const load = async ({ params, locals: { sb, userData } }) => {
    if (!userData.site_admin) {
        throw error(401, { message: "You do not have access to this page." })
    }

    const schoolID = await Number(params.school);

    async function getSchool() {
        const { data, error } = await sb
        .from('schools')
        .select('*')
        .eq('id', schoolID)
        .limit(1)
        .single()

        if (!error) {
            return data
        }

        return null
    }

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

        if (!error) {
            return data
        }

        return null
    }

    return {
        school: await getSchool(),
        schoolUsers: await getSchoolUsers()
    }
}

export const actions = {
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
    },

    bulkCreate: async ({ request, locals: { sb }}) => {
        const body = Object.fromEntries(await request.formData())

        console.log(body);
    }
};