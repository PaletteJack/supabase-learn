import { error } from '@sveltejs/kit'

export const load = async ({ params, locals: { sb, userData } }) => {
    const classID = await Number(params.class);
    const userRole = userData.role

    async function getResourceCards() {
        const { data, error } = await sb.from('resource_cards').select('*').eq('classroom', classID)

        if (data) {
            return data;
        }

        return null
    }

    if (userRole === 'Teacher') {
        const { data: classroom, error: err } = await sb
            .from('classrooms')
            .select()
            .eq('id', classID)
            .eq('owner', userData.id)
            .limit(1)
            .single();
            
        if (!err) {
            return {
                classroom,
                is_owner: true,
                userData: userData,
                streamed: {
                    cards: getResourceCards()
                }
            }
        }
    } else if (userRole === 'Student') {
        const { data: classroomIDs, error: err1 } = await sb
            .from('classroom_students')
            .select('class')
            .eq('student', userData.id);

        if (err1) console.log('error 1: ', err1)

        if (classroomIDs?.map(({ class: classroomID }) => classroomID).includes(classID)) {
            const { data: classroom, error: err2 } = await sb
                .from('classrooms')
                .select('*')
                .eq('id', classID)
                .single();

            if (err2) console.log('error 1: ', err2)

            if (!err2) {

                return {
                    classroom,
                    userData: userData,
                    streamed: {
                        cards: getResourceCards()
                    }
                }
            }
        }

    }

    throw error(401, {
        message: "You do not have access to this Classroom."
    })

}