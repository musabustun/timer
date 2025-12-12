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
    const recurrence = formData.get('recurrence') as string
    const imageUrl = formData.get('imageUrl') as string
    const isRecurring = !!recurrence && recurrence !== 'none'
    const id = formData.get('id') as string

    if (!title || !dateStr) {
        throw new Error('Missing title or date')
    }

    const data = {
        title,
        // Append +03:00 to treat input as Istanbul time, since datetime-local is timezone agnostics
        // Date("2024-01-01T00:00") assumes server local. 
        // Date("2024-01-01T00:00+03:00") forces explicit offset.
        targetDate: new Date(`${dateStr}:00+03:00`),
        isRecurring,
        recurrence: isRecurring ? recurrence : null,
        imageUrl: imageUrl || null
    }

    if (id) {
        await prisma.timer.update({
            where: { id },
            data
        })
    } else {
        await prisma.timer.create({
            data
        })
    }

    revalidatePath('/')
    revalidatePath('/yonet')
}

export async function logNotification(title: string, body: string) {
    await prisma.notificationLog.create({
        data: { title, body }
    })
    revalidatePath('/yonet')
}

export async function deleteTimer(id: string) {
    await prisma.timer.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/yonet')
}
