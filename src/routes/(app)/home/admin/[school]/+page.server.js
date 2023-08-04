import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { sb, userData } }) => {
    if (!userData.site_admin) {
        throw error(401, { message: "You do not have access to this page." })
    }

    const schoolID = await Number(params.school);

    throw redirect(302, `/home/admin/${schoolID}/user-management`)

}