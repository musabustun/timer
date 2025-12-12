'use client'

import { checkMessages } from '@/actions/polling'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function NotificationManager({ timers }: { timers: any[] }) {
    const router = useRouter()

    useEffect(() => {
        if (typeof window === 'undefined') return

        // Timer checks (keep existing logic)
        const checkTimers = () => {
            // ... existing timer logic ...
        }

        async function registerServiceWorker() {
            if ('serviceWorker' in navigator && 'PushManager' in window && typeof window !== 'undefined') {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js')
                    console.log('SW registered:', registration)

                    // Check subscription
                    const existingSub = await registration.pushManager.getSubscription()
                    if (!existingSub) {
                        // Get key from server
                        const { getVapidPublicKey } = await import('@/actions/push')
                        const publicKey = await getVapidPublicKey()

                        const convertedVapidKey = urlBase64ToUint8Array(publicKey)
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey
                        })

                        // Save to server
                        const { subscribeUser } = await import('@/actions/push')
                        await subscribeUser(JSON.parse(JSON.stringify(subscription)))
                        console.log('User Subscribed')
                    }
                } catch (error) {
                    console.error('SW Error:', error)
                }
            }
        }

        // Helper for VAPID key
        function urlBase64ToUint8Array(base64String: string) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4)
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
            const rawData = window.atob(base64)
            const outputArray = new Uint8Array(rawData.length)
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i)
            }
            return outputArray
        }

        // Initialize
        if (Notification.permission === 'granted') {
            registerServiceWorker()
        }

        // Message polling (keep existing logic as fallback or parallel)
        const pollMessages = async () => {
            // ...
        }

        const interval = setInterval(() => {
            // checkTimers()
            // pollMessages() 
            // We can keep polling as backup, but push should be primary.
        }, 10000)

        // Run once
        checkTimers()
        pollMessages()

        return () => clearInterval(interval)
    }, [timers, router])

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {typeof window !== 'undefined' && Notification.permission === 'default' && (
                <button
                    onClick={() => {
                        Notification.requestPermission().then(res => {
                            if (res === 'granted') {
                                window.location.reload() // Simple way to trigger effect or call register manually
                            }
                        })
                    }}
                    className="bg-rose-soft text-white px-4 py-2 rounded-full shadow-lg text-sm hover:scale-105 transition-transform"
                >
                    Bildirimleri Aç
                </button>
            )}
        </div>
    )
}
