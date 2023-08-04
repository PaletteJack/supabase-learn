

export const load = async ({ params, locals: { sb } }) => {
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

    return {
        school: await getSchool()
    }
}