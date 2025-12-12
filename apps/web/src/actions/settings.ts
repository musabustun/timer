'use server'

import { prisma } from 'database'
import { revalidatePath } from 'next/cache'

export async function getAccessCode() {
    const setting = await prisma.setting.findUnique({
        where: { key: 'access_code' }
    })
    return setting?.value || 'byz'
}

export async function updateAccessCode(formData: FormData) {
    const code = formData.get('code') as string
    if (!code) return

    await prisma.setting.upsert({
        where: { key: 'access_code' },
        update: { value: code },
        create: { key: 'access_code', value: code }
    })

    revalidatePath('/')
}
