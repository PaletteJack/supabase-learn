import { redirect } from "@sveltejs/kit";


export let load = async ({url, locals: { getSession }}) => {
    const session = getSession()

    if (session) {
        throw redirect(303, "/dashboard")
    }

    return { url: url.origin }
}