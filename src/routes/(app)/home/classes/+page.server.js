import { fail } from '@sveltejs/kit'


export const load = async ({ locals: { sb, userData } }) => {
    const id = userData.id
    const userRole = userData.role;

    if (userRole === "Teacher") {
        const { data, error } = await sb
        .from('classrooms')
        .select('*')
        .eq('owner', id)

        if (!error) {
            return {
                classes: data
            }
        }
        
    } else if (userRole === "Student") {
        const { data, error } = await sb
        .from('classroom_students')
        .select('class ( * )')
        .eq('student', id)

        if (!error) {
            return {
                classes: data,
                isStudent: true
            }
        }

    } else if (userRole === "Admin" || userRole == "Site Admin") {
        const { data, error } = await sb
        .from('classrooms')
        .select('*')

        if (!error) {
            return {
                classes: data
            }
        }

    }

    throw fail(500, {
        message: "Could not load classes!"
    })
}