

export const load = async ({ params, locals: { sb }}) => {

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
};