

export const load = async ({ params, locals: { sb } }) => {
    const schoolID = await Number(params.school);
    const classroomID = await Number(params.classroom);

    async function getClassroom() {
        const { data, error } = await sb
        .from('classrooms')
        .select(`
        id,
        owner ( id, first_name, last_name ),
        name
        `)
        .eq('id', classroomID)
        .limit(1)
        .single()

        if (!error) {
            return data
        }

        return null
    }

    async function getSchoolStudents() {
        const { data, error } = await sb
        .rpc('get_students_with_classroom_assignment', {
            school_id: schoolID,
            classroom_id: classroomID
        })

        if (!error) {
            return data
        }

        return null
    }

    return {
        classroom: await getClassroom(),
        students: await getSchoolStudents()
    }
}