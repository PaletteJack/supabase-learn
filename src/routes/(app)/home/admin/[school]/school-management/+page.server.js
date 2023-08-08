import { fail } from '@sveltejs/kit';


export const actions = {
    addAnnouncement: async ({ request, locals: { sb } }) => {
        const { author, school, start_date, exp_date, title, body } = Object.fromEntries(await request.formData());

        const { error: err } = await sb
        .from('announcements')
        .insert({
            author,
            school: Number(school),
            start_date,
            exp_date,
            title,
            body
        })

        if (!err) {
            return {
                message: "Added announcement successfully"
            }
        }
        
        console.error("There was a problem adding the announcement: ", err)

        return fail(500, {
            message: `Something went wrong. ${err.message}`
        })
    },
};