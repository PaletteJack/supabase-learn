import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { sb, userData } }) => {
    const id = userData.id
    const schoolID = userData.school.id
    const date = new Date().toISOString().split('T')[0]

    async function getTodos() {
        const { data, error } = await sb
        .from('todos')
        .select('*')
        .eq('owner', id)

        if (!error) {
            return data
        }

        console.error('There was a problem loading the todos: ', error);
        return null
    }

    async function getAnnouncements() {
        const { data, error } = await sb
        .from('announcements')
        .select('*')
        .lte('start_date', date)
        .gte('exp_date', date)
        .eq('school', schoolID)


        if (!error) {
            return data
        }

        console.error('There was a problem loading the announcements: ', error);
        return null
    }

    return {
        todos: await getTodos(),
        announcements: await getAnnouncements()
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    createTodo: async ({ request, locals: { sb, userData }}) => {
        const body = Object.fromEntries(await request.formData());
        const id = userData.id

        const { error: err } = await sb
        .from('todos')
        .insert({owner: id, task: body.task})

        if (!err) {
            return {
                message: "Todo added"
            }
        }

        console.log(err);

        return fail(500, {
            message: `Could not add todo. Reason: ${err.message}`
        })

    },
    
    deleteTodo: async ({ request, locals: { sb }}) => {
        const body = Object.fromEntries(await request.formData())
        
        const { error: err } = await sb
        .from('todos')
        .delete()
        .eq('id', Number(body.id))
        
        if (!err) {
            return {
                message: "Todo deleted"
            }
        }

        console.log(err);

        return fail(500, {
            message: `Something went wrong: ${err.message}`
        })
    }
}