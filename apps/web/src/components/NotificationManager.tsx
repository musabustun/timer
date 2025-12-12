'use client'

import { checkMessages } from '@/actions/polling'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function NotificationManager({ timers }: { timers: any[] }) {
    const router = useRouter()

    useEffect(() => {
        if (typeof window === 'undefined') return

        // Timer checks
        const checkTimers = () => {
            if (Notification.permission !== 'granted') return

            timers.forEach(timer => {
                const target = new Date(timer.targetDate) // Simplified logic, assumes next occurrence logic is handled or targetDate is valid
                const now = new Date()
                // Recurrence logic should be calculated here or passed pre-calculated
                // Simplified for MVP
                const diff = target.getTime() - now.getTime()
                const hours = diff / (1000 * 60 * 60)

                // Simple hardcoded check: 24h before
                // Realistically, we need user preference.
                if (hours > 0 && hours < 24) {
                    const key = `notified-${timer.id}-${target.getDate()}`
                    if (!localStorage.getItem(key)) {
                        new Notification(timer.title, { body: '24 Saatten az kaldı! ❤️' })
                        localStorage.setItem(key, 'true')
                    }
                }
            })
        }

        // Message polling
        const pollMessages = async () => {
            try {
                const messages = await checkMessages()
                if (messages.length > 0 && Notification.permission === 'granted') {
                    messages.forEach(msg => {
                        const title = msg.isSecret ? "Musab'dan sana mesaj var ❤️" : "Yeni Mesaj ❤️"
                        const body = msg.isSecret ? "Okumak için tıkla..." : msg.content

                        const n = new Notification(title, { body, tag: msg.id })

                        if (msg.isSecret) {
                            n.onclick = () => {
                                window.focus()
                                router.push(`/message/${msg.id}`)
                            }
                        }
                    })
                }
            } catch (e) {
                console.error(e)
            }
        }

        const interval = setInterval(() => {
            checkTimers()
            pollMessages()
        }, 10000) // Poll every 10s

        return () => clearInterval(interval)
    }, [timers, router])

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {typeof window !== 'undefined' && Notification.permission === 'default' && (
                <button
                    onClick={() => Notification.requestPermission()}
                    className="bg-rose-soft text-white px-4 py-2 rounded-full shadow-lg text-sm hover:scale-105 transition-transform"
                >
                    Bildirimleri Aç
                </button>
            )}
        </div>
    )
}
