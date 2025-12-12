'use server'

import { prisma } from 'database'
import { sendPushNotification } from './push'

export async function sendMessage(content: string, isSecret: boolean) {
    const msg = await prisma.message.create({
        data: { content, isSecret }
    })

    // Send Push Notification
    const title = isSecret ? "Musab'dan sana mesaj var ❤️" : "Yeni Mesaj ❤️"
    const body = isSecret ? "Okumak için tıkla..." : content

    // Fire and forget push to avoid blocking response
    const url = isSecret ? `/message/${msg.id}` : '/yonet'
    sendPushNotification(body, title, url).catch(err => console.error("Push failed:", err))
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
