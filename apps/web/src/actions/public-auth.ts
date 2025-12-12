'use server'

import { getAccessCode } from './settings'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifyAccessCode(prevState: any, formData: FormData) {
    try {
        const inputCode = formData.get('code') as string
        const actualCode = await getAccessCode()

        if (inputCode === actualCode) {
            // Set cookie for 1 year
            (await cookies()).set('public_access', 'true', {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                path: '/',
                httpOnly: false, // Allow JS access for debugging
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            })
            // Return success so client can handle redirect
            // This avoids issues with stale Server Action IDs
            return { success: true }
        } else {
            return { error: 'Yanlış kod' }
        }
    } catch (error) {
        console.error('verifyAccessCode error:', error)
        return { error: 'Bir hata oluştu. Sayfayı yenileyip tekrar deneyin.' }
    }
}
