

export const load = async ({ params, locals: { sb }}) => {
    const classID = await Number(params.class);

    async function getResourceCards() {
        const { data, error } = await sb
        .from('resource_cards')
        .select('*')
        .eq('classroom', classID)
        .order('sort_order', {ascending: true})

        if (data) {
            return data;
        }

        return null
    }

    return {
        classID: classID,
        cards: await getResourceCards(),
    }
}

export const actions = {
    createCard: async ({ request, locals: { sb } }) => {
        const body = Object.fromEntries(await request.formData());
        const { classroom, name, link, icon } = body
        let imageLink = "https://epalnbncirlkzxastmpe.supabase.co/storage/v1/object/public/link-icons/";

        const { data: iconResult, error: iconError} = await sb
        .storage
        .from('link-icons')
        .upload(`${icon.name}`, icon, {
            cacheControl: "3600",
            upsert: false
        })

        if(iconError) {
            console.error('Have an error: ', error);
        }

        if (iconResult) {
            imageLink = imageLink + iconResult.path
        } else {
            imageLink = null
        }

        const { error: err } = await sb
        .from('resource_cards')
        .insert({classroom: classroom, name: name, link: link, icon: imageLink})
        
        if (!err) {
            return {
                message: "Card added!"
            }
        }

        console.log('error with link creation', err);

        return fail(500, {
            message: "Something went wrong. Refresh the page and try again."
        })
    },
};