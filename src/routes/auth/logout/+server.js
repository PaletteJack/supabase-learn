import { redirect, fail } from '@sveltejs/kit';

export const GET = async ({ cookies, locals: { sb }}) => {
    const { error } = await sb.auth.signOut();
    cookies.set('user_data', '', { maxAge: 0})
    cookies.set('sb-epalnbncirlkzxastmpe-auth-token', '', {maxAge: 0})

    if (error) {
        console.log(error);
        return fail(500, {
            message: "Could not sign out at this time!"
        })
    }

    throw redirect('303', '/login')

}

export const POST = async ({ cookies, locals: { sb }}) => {
    const { error } = await sb.auth.signOut();
    cookies.set('user_data', '', { maxAge: 0})
    cookies.set('sb-epalnbncirlkzxastmpe-auth-token', '', {maxAge: 0})

    if (error) {
        console.log(error);
        return fail(500, {
            message: "Could not sign out at this time!"
        })
    }

    throw redirect('303', '/login')

}