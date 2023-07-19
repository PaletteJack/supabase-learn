import { fail } from '@sveltejs/kit'


export const load = async ({ locals: { sb } }) => {
    const { data, error } = await sb.from('classrooms').select('*')

    if (!error) {
        return {
            classes: data
        }
    }

    throw fail(500, {
        message: "Could not load classes!"
    })
}