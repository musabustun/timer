'use server'

import { prisma } from 'database'

import { revalidatePath } from 'next/cache'

export async function getNotificationLogs() {
    return await prisma.notificationLog.findMany({
        orderBy: { sentAt: 'desc' },
        take: 20
    })
}

export async function clearNotificationLogs() {
    await prisma.notificationLog.deleteMany()
    revalidatePath('/yonet')
}
