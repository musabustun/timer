'use client'

import { useEffect } from 'react'

export function NotificationManager({ timers }: { timers: any[] }) {
    useEffect(() => {
        if (typeof window === 'undefined') return

        if (Notification.permission === 'default') {
            // Minimal prompt or just wait for user interaction?
            // For personal app, we can just request.
        }

        const check = () => {
            if (Notification.permission !== 'granted') return

            timers.forEach(timer => {
                const target = new Date(timer.targetDate) // Simplified logic, assumes next occurrence logic is handled or targetDate is valid
                const now = new Date()
                const diff = target.getTime() - now.getTime()
                const hours = diff / (1000 * 60 * 60)

                // Simple hardcoded check: 24h before
                // Realistically, we need user preference.
                if (hours > 0 && hours < 24) {
                    const key = `notified-${timer.id}-${target.getDate()}`
                    if (!localStorage.getItem(key)) {
                        new Notification(timer.title, { body: 'Less than 24 hours remaining!' })
                        localStorage.setItem(key, 'true')
                    }
                }
            })
        }

        const interval = setInterval(check, 60000)
        return () => clearInterval(interval)
    }, [timers])

    return (
        <div className="fixed bottom-4 right-4">
            {typeof window !== 'undefined' && Notification.permission === 'default' && (
                <button
                    onClick={() => Notification.requestPermission()}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg text-sm"
                >
                    Enable Notifications
                </button>
            )}
        </div>
    )
}
