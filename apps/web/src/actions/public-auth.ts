'use server'

import { getAccessCode } from './settings'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifyAccessCode(prevState: any, formData: FormData) {
    const inputCode = formData.get('code') as string
    const actualCode = await getAccessCode()

    if (inputCode === actualCode) {
        // Set cookie for 1 year
        (await cookies()).set('public_access', 'true', {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            path: '/'
        })
        redirect('/')
    } else {
        return { error: 'Incorrect code' }
    }
}
