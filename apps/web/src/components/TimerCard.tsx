'use client'

import { useEffect, useState } from 'react'

export function TimerCard({ timer }: { timer: any }) {
    const [timeLeft, setTimeLeft] = useState<string>('')

    // Basic recurring logic: yearly
    const getTargetDate = () => {
        let target = new Date(timer.targetDate)
        const now = new Date()

        if (timer.isRecurring) {
            if (timer.recurrence === 'yearly' || true) { // Default/Force yearly for MVP
                target.setFullYear(now.getFullYear())
                if (target < now) {
                    target.setFullYear(now.getFullYear() + 1)
                }
            }
        }
        return target
    }

    const [target, setTarget] = useState<Date | null>(null)

    useEffect(() => {
        setTarget(getTargetDate())
    }, [timer])

    useEffect(() => {
        if (!target) return
        const interval = setInterval(() => {
            const now = new Date()
            const diff = target.getTime() - now.getTime()

            if (diff <= 0) {
                setTimeLeft('Arrived!')
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
        }, 1000)

        return () => clearInterval(interval)
    }, [target])

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 shadow-lg hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                    {timer.title}
                </h3>
                {timer.isRecurring && (
                    <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">Yearly</span>
                )}
            </div>

            <div className="text-3xl font-mono font-medium tracking-tight text-blue-400">
                {timeLeft || 'Loading...'}
            </div>

            <div className="text-xs text-zinc-500">
                Target: {target?.toLocaleDateString()}
            </div>

            <div className="mt-auto pt-4 flex gap-2">
                {/* Placeholder for Details/Notes link */}
                <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded text-sm transition-colors">
                    Details & Notes
                </button>
            </div>
        </div>
    )
}
