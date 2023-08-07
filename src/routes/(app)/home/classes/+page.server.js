import { fail } from '@sveltejs/kit'


export const load = async ({ locals: { sb, userData } }) => {
    const id = userData.id
    const userRole = userData.role;
    const schoolID = userData.school.id

    if (userRole === "Teacher") {
        const { data: teacherData, error: teacherErr } = await sb
        .from('classrooms')
        .select('*')
        .eq('school', schoolID)
        .eq('owner', id)

        if (!teacherErr) {
            return {
                classes: teacherData,
                isTeacher: true
            }
        }
        
    } else if (userRole === "Student") {
        const { data: studentClassrooms, error: studentErr } = await sb
        .from('classroom_students')
        .select('class ( * )')
        .eq('student', id)

        if (!studentErr) {
            return {
                classes: studentClassrooms,
                isStudent: true
            }
        }

    } else if (userRole === "Admin" || userRole == "Site Admin") {
        const { data: adminData, error: adminErr } = await sb
        .rpc('get_schools_with_classrooms');

        if (!adminErr) {
            return {
                classes: adminData,
                isAdmin: true
            }
        }

    }

    throw fail(500, {
        message: "Could not load classes!"
    })
}