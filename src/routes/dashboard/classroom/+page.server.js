import { error } from '@sveltejs/kit'

export const load = async ({ locals: { sb, userID } }) => {
    const { data, error: err } = await sb
    .from('classrooms')
    .select()
    .eq('owner', userID)
    .limit(1)
    .single()

    if (data) {
        console.log(data);
        return {
            classroom: data
        }
    }

    if (err) {
        console.log(err);
    }

    throw error(401, {
        message: "You do not have access to this classroom!"
    })
}