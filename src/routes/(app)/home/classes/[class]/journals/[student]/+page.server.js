import { fail } from '@sveltejs/kit';

export const load = async ({ params, locals: { sb }}) => {
    const classID = await Number(params.class);
    const student = await params.student;

    async function getStudent() {
        const { data, error } = await sb
        .from('user_data')
        .select('first_name, last_name')
        .eq('id', student)
        .limit(1)
        .single()

        if (data) {
            return data
        }

        return null
    }

    async function getJournalEntries() {
        const { data, error } = await sb
        .from('journals')
        .select(`
        id,
        entry_date,
        body,
        edited
        `)
        .eq('class', classID)
        .eq('owner', student)
        .neq('body', '')
        .order('entry_date', { ascending: false })

        if (data) {
            return data;
        }
        console.log(error);

        return null
    }

    return {
        classID: classID,
        student: await getStudent(),
        streamed: {
            journalEntries: await getJournalEntries(),
        }
    }
}