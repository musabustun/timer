'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function TimerCard({ timer }: { timer: any }) {
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [target, setTarget] = useState<Date | null>(null)

    const getTargetDate = () => {
        let target = new Date(timer.targetDate)
        const now = new Date()

        if (timer.isRecurring) {
            if (timer.recurrence === 'monthly') {
                target.setMonth(now.getMonth())
                target.setFullYear(now.getFullYear())
                if (target < now) {
                    target.setMonth(now.getMonth() + 1)
                }
            } else if (timer.recurrence === 'yearly' || true) {
                target.setFullYear(now.getFullYear())
                if (target < now) {
                    target.setFullYear(now.getFullYear() + 1)
                }
            }
        }
        return target
    }

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

            setTimeLeft(`${days}g ${hours}s ${minutes}dk ${seconds}sn`)
        }, 1000)

        return () => clearInterval(interval)
    }, [target])

    return (
        <Link href={`/timer/${timer.id}`}>
            <div className="group relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 flex flex-col gap-4 shadow-xl hover:shadow-2xl hover:shadow-rose-soft/20 transition-all hover:scale-[1.02] cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-rose-soft">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                <div className="flex justify-between items-start z-10">
                    <h3 className="text-2xl font-bold bg-gradient-to-br from-text-soft to-text-soft/70 bg-clip-text text-transparent group-hover:text-rose-soft transition-colors">
                        {timer.title}
                    </h3>
                    {timer.isRecurring && (
                        <span className="text-xs bg-rose-soft/10 text-rose-soft border border-rose-soft/20 px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                            {timer.recurrence === 'monthly' ? 'Aylık' : 'Yıllık'}
                        </span>
                    )}
                </div>

                <div className="text-4xl font-mono font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-soft to-pink-soft z-10">
                    {timeLeft || 'Hesaplanıyor...'}
                </div>

                <div className="text-sm text-zinc-500 font-medium z-10">
                    Hedef: {target?.toLocaleDateString('tr-TR')}
                </div>
            </div>
        </Link>
    )
}
