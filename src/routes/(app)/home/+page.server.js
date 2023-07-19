import { redirect } from '@sveltejs/kit'


export const load = async ({ locals: { userData} }) => {
    if (userData) {
        return {
            userData: userData
        }
    }

    throw redirect(301, '/login')
}