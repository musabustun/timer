'use server'

import webpush from 'web-push'
import { prisma } from 'database'

const vapidKeys = {
    publicKey: 'BLrY-dZcfL_v-i-YFEFwswgHia6biBi-KINIuFpDZVubiT-Knn1EXKAzpAJGDAdj6QZ9CNQsEtkRTSvZI5igZN0',
    privateKey: '4Pkidqw7QJcazFvqdWuSjpUvJagxqf_eU8iCYTE2vgk'
}

webpush.setVapidDetails(
    'mailto:admin@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

export async function subscribeUser(sub: any) {
    if (!sub || !sub.endpoint) {
        throw new Error('Invalid subscription')
    }

    // Convert keys to string if they are not already
    const p256dh = sub.keys?.p256dh
    const auth = sub.keys?.auth

    if (!p256dh || !auth) {
        throw new Error('Invalid keys')
    }

    await prisma.pushSubscription.upsert({
        where: { endpoint: sub.endpoint },
        update: {
            p256dh,
            auth
        },
        create: {
            endpoint: sub.endpoint,
            p256dh,
            auth
        }
    })

    return { success: true }
}

export async function sendPushNotification(payload: string, title: string = 'Yeni Bildirim', url: string = '/yonet') {
    const subscriptions = await prisma.pushSubscription.findMany()

    const results = await Promise.allSettled(
        subscriptions.map(async (sub) => {
            try {
                await webpush.sendNotification(
                    {
                        endpoint: sub.endpoint,
                        keys: {
                            p256dh: sub.p256dh,
                            auth: sub.auth
                        }
                    },
                    JSON.stringify({ title, body: payload, url })
                )
            } catch (error: any) {
                if (error.statusCode === 404 || error.statusCode === 410) {
                    console.log('Subscription expired/gone, deleting:', sub.id)
                    await prisma.pushSubscription.delete({ where: { id: sub.id } })
                } else {
                    console.error('Push error:', error)
                }
            }
        })
    )
}

export async function getVapidPublicKey() {
    return vapidKeys.publicKey
}
