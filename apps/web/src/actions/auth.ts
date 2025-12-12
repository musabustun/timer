'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function adminLogin(formData: FormData) {
    const password = formData.get('password')

    // Hardcoded password for now - in production use env var
    if (password === 'admin123') {
        (await cookies()).set('admin_auth', 'true', { path: '/' })
        redirect('/yonet')
    }
}
