import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { sb, userData } }) => {
    const id = userData.id

    const { data: todos, error: err } = await sb
    .from('todos')
    .select('*')
    .eq('owner', id)

    if (!err) {
        return {
            todos
        }
    }

    console.error('There was a problem loading the todos: ', err);

    return {
        todos: null
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
    },

    completeTodo: async ({ request, locals: { sb }}) => {
        const body = Object.fromEntries(await request.formData())

        console.log(body);
        
        // const { error: err } = await sb
        // .from('todos')
        // .delete()
        // .eq('id', Number(body.id))
        
        // if (!err) {
        //     return {
        //         message: "Todo deleted"
        //     }
        // }

        // console.log(err);

        // return fail(500, {
        //     message: `Something went wrong: ${err.message}`
        // })
    },
}