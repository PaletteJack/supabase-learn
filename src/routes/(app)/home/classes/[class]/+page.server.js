import { error, fail } from '@sveltejs/kit'

export const load = async ({ params, locals: { sb, userData } }) => {
    
    const userID = userData.id
    const userRole = userData.role
    const classID = await Number(params.class);
    const date = new Date().toLocaleDateString();

    if (userRole === 'Teacher') {
        const { data: classroom, error: err } = await sb
            .from('classrooms')
            .select()
            .eq('id', classID)
            .eq('owner', userID)
            .limit(1)
            .single();

        if (err) {
            console.error({err})
        }
            
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
            .eq('student', userID);

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
                        cards: getResourceCards(),
                        journal: getJournal(),
                        journalList: getAllJournals()
                    }
                }
            }
        }

    }

    async function getAllJournals() {
        let { data: journals, error } = await sb
            .from('journals')
            .select('*')
            .eq('class', classID)
            .eq('owner', userID)
            .neq('entry_date', date)
            .then();

        if (error) {
            console.error('Error getting or creating journal entry: ', error);
            return
        }

        return journals;

    }

    async function getJournal() {
        let { data: journal, error } = await sb
            .from('journals')
            .select('*')
            .eq('class', classID)
            .eq('owner', userID)
            .eq('entry_date', date)
            .maybeSingle();
        
        if (!journal && !error) {
            ({ data: journal, error } = await sb
                .from('journals')
                .insert([{ 
                    owner: userID, 
                    entry_date: date, 
                    class: classID,
                    body: '',
                    is_editable: true,
                }])
                .select()
                .single());
        }

        if (error) {
            console.error('Error getting or creating journal entry: ', error);
            return
        }

        return journal;
    }

    async function getResourceCards() {
        const { data, error } = await sb.from('resource_cards').select('*').eq('classroom', classID)

        if (data) {
            return data;
        }

        return null
    }

    throw error(401, {
        message: "You do not have access to this Classroom."
    })

}

export const actions = {
    createCard: async ({ request, locals: { sb } }) => {
        console.log('hit action');
        const body = Object.fromEntries(await request.formData());
        console.log(body.icon);
    },

    saveJournal: async ({ request, locals: { sb } }) => {
        const formBody = Object.fromEntries(await request.formData());
        

        const { error: err} = await sb
        .from('journals')
        .update({body: formBody.body})
        .eq('id', formBody.id)

        if (!err) {
            return {
                message: 'Journal Saved!'
            }
        }

        return fail(500, {
            message: "Couldn't save your journal!"
        })
    }
};