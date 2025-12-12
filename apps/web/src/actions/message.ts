'use server'

import { prisma } from 'database'

export async function sendMessage(content: string, isSecret: boolean) {
    await prisma.message.create({
        data: { content, isSecret }
    })
}

export async function getUnreadMessages() {
    const messages = await prisma.message.findMany({
        where: { isRead: false },
        orderBy: { createdAt: 'asc' }
    })

    // Mark as read after fetching (basic queue logic)
    if (messages.length > 0) {
        await prisma.message.updateMany({
            where: { id: { in: messages.map(m => m.id) } },
            data: { isRead: true }
        })
    }

    return messages
}

export async function getMessage(id: string) {
    return await prisma.message.findUnique({
        where: { id }
    })
}
