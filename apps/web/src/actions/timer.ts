'use server'

import { prisma } from 'database'
import { revalidatePath } from 'next/cache'

export async function getTimers() {
    return await prisma.timer.findMany({
        orderBy: { targetDate: 'asc' },
        include: { notes: true }
    })
}

export async function createTimer(formData: FormData) {
    const title = formData.get('title') as string
    const dateStr = formData.get('targetDate') as string
    const isRecurring = formData.get('isRecurring') === 'on'

    if (!title || !dateStr) {
        throw new Error('Missing title or date')
    }

    await prisma.timer.create({
        data: {
            title,
            targetDate: new Date(dateStr),
            isRecurring,
            recurrence: isRecurring ? 'yearly' : null // Default to yearly for now if recurring
        }
    })

    revalidatePath('/')
    revalidatePath('/yonet')
}

export async function deleteTimer(id: string) {
    await prisma.timer.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/yonet')
}
