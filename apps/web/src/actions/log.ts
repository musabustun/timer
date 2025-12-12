'use server'

import { prisma } from 'database'

export async function getNotificationLogs() {
    return await prisma.notificationLog.findMany({
        orderBy: { sentAt: 'desc' },
        take: 20
    })
}
