'use server'

import { prisma } from 'database'
import { revalidatePath } from 'next/cache'

export async function addNote(timerId: string, type: 'TEXT' | 'AUDIO' | 'VIDEO', content: string) {
    await prisma.note.create({
        data: {
            timerId,
            type,
            content
        }
    })
    revalidatePath(`/timer/${timerId}`)
}

export async function getTimerDetails(id: string) {
    return await prisma.timer.findUnique({
        where: { id },
        include: { notes: { orderBy: { createdAt: 'desc' } } }
    })
}
