import { redirect, fail } from '@sveltejs/kit';

export const POST = async ({ locals: { sb }}) => {
    const { error } = await sb.auth.signOut();

    if (error) {
        console.log(error);
        return fail(500, {
            message: "Could not sign out at this time!"
        })
    }

    throw redirect('303', '/login')

}