import { error, fail } from '@sveltejs/kit';


export const load = async ({ params, locals: { sb, userData }}) => {
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

        console.log(error);

        return null
    }

    if (!userData.site_admin) {

        const { data, error: err } = await sb
        .from('classrooms')
        .select('*')
        .eq('id', classID)
        .eq('owner', userData.id)

        if (!data || data.length == 0) {
            console.log(err);
            throw error(401, {message: "You do not have permission to access this page."})
        }

        return {
            classID: classID,
            cards: await getResourceCards(),
        }
    }

    return {
        classID: classID,
        cards: await getResourceCards(),
    }
}

export const actions = {
    createCard: async ({ request, locals: { sb } }) => {
        const body = Object.fromEntries(await request.formData());
        const { classroom, name, link, icon, school, scope } = body
        let imageLink = null;

        if (icon.size != 0) {
            const { data: iconResult, error: iconError} = await sb
            .storage
            .from('link-icons')
            .upload(`${icon.name}`, icon, {
                cacheControl: "3600",
                upsert: false
            })
    
            if(iconError) {
                console.error('Have an error: ', iconError);
            }
    
            if (iconResult) {
                imageLink = "https://epalnbncirlkzxastmpe.supabase.co/storage/v1/object/public/link-icons/" + iconResult.path
            } else {
                imageLink = null
            }
        }

        const { data: maxSortOrderData, error: maxSortOrderError } = await sb
        .from('resource_cards')
        .select('sort_order')
        .eq('classroom', classroom)
        .order('sort_order', { ascending: false })
        .limit(1);

        if (maxSortOrderError) {
            console.error('Error fetching max sort_order: ', maxSortOrderError);
            return fail(500, {
                message: "Something went wrong. Refresh the page and try again."
            })
        }

        const newSortOrder = maxSortOrderData.length > 0 ? maxSortOrderData[0].sort_order + 1 : 1;

        const { error: err } = await sb
        .from('resource_cards')
        .insert({
            classroom: classroom,
            name: name, 
            link: link, 
            icon: imageLink, 
            sort_order: newSortOrder,
            school: Number(school),
            scope: scope
        })
        
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

    updateCard:  async ({ request, locals: { sb } }) => {
        const body = Object.fromEntries(await request.formData())
        const id = Number(body.id);
        const oldData = JSON.parse(body.oldData);
        delete body.oldData
        let newData = {}

        for (let key in body) {
            if (typeof body[key] === 'string' && ['true', 'false'].includes(body[key])) {
                body[key] = body[key] === 'true';
            }

            if (typeof body[key] === 'object') {
                if (body[key].size !== 0) {
                    let imageLink = "https://epalnbncirlkzxastmpe.supabase.co/storage/v1/object/public/link-icons/";
                    const { data, error: err } = await sb
                        .storage
                        .from('link-icons')
                        .upload(`${body[key].name}`, body[key])

                    if (!err) {
                        const iconLink = imageLink + data.path;
                        newData[key] = iconLink;
                    } else {
                        console.error('There was an issue uploading the file', err);
                    }
                }
                continue;
            }

            if (body[key] != oldData[key] && body[key] !== null && body[key] !== '') {
                newData[key] = body[key];
            }
        }

        // console.log(newData);

        const { error: err } = await sb
        .from('resource_cards')
        .update(newData)
        .eq('id', id)

        if (!err) {
            return {
                message: "Card updated"
            }
        }

        if (err) {
            console.error('Could not update card: ', err);
            return fail(400, {
                message: "Bad request. Try again later"
            })
        }

        return fail(500, {
            message: "Something went wrong."
        })

    }
};