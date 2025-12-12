'use client'

import { addNote } from '@/actions/note'
import { NoteUploader } from '@/components/NoteUploader'
import { useState, useEffect } from 'react'

export default function FullScreenTimer({ timer }: { timer: any }) {
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [isNoteOpen, setIsNoteOpen] = useState(false)

    // Logic duplicated from TimerCard (should refactor shared hook in production)
    const [target, setTarget] = useState<Date | null>(null)

    useEffect(() => {
        let targetDate = new Date(timer.targetDate)
        const now = new Date()

        if (timer.isRecurring) {
            if (timer.recurrence === 'monthly') {
                targetDate.setMonth(now.getMonth())
                targetDate.setFullYear(now.getFullYear())
                if (targetDate < now) {
                    targetDate.setMonth(now.getMonth() + 1)
                }
            } else if (timer.recurrence === 'yearly' || true) {
                targetDate.setFullYear(now.getFullYear())
                if (targetDate < now) {
                    targetDate.setFullYear(now.getFullYear() + 1)
                }
            }
        }
        setTarget(targetDate)
    }, [timer])

    useEffect(() => {
        if (!target) return
        const interval = setInterval(() => {
            const now = new Date()
            const diff = target.getTime() - now.getTime()

            if (diff <= 0) {
                setTimeLeft('Vakit Geldi! ❤️')
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setTimeLeft(`${days}g ${hours}s ${minutes}d ${seconds}sn`)
        }, 1000)

        return () => clearInterval(interval)
    }, [target])

    const handleRemindMe = () => {
        // Local Notification Logic
        if (Notification.permission === 'granted') {
            new Notification(`Hatırlatıcı: ${timer.title}`, {
                body: '24 saat kala haber vereceğim.'
            })
            alert('Hatırlatıcı Kuruldu! ❤️')
        } else {
            Notification.requestPermission().then(p => {
                if (p === 'granted') {
                    new Notification('Bildirimler Açık')
                }
            })
        }
    }

    return (
        <div className="relative min-h-screen bg-color-cream-50 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-cream-gradient opacity-80 z-0"></div>

            {timer.imageUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-40 blur-sm scale-105 transition-transform duration-[20s] alternate animate-pulse"
                    style={{ backgroundImage: `url(${timer.imageUrl})` }}
                >
                    {/* Dark Overlay for Contrast */}
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            )}

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-600/20 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl drop-shadow-lg">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] bg-clip-text">
                        {timeLeft || 'Yükleniyor...'}
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-light text-rose-100 tracking-widest uppercase drop-shadow-md">
                        {timer.title}
                    </h2>
                    <div className="text-sm text-white/80 font-mono drop-shadow">
                        Hedef: {target?.toLocaleDateString('tr-TR')}
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleRemindMe}
                        className="group flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-200 group-hover:text-rose-100">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span className="text-rose-100 font-medium drop-shadow-sm">Bana Hatırlat</span>
                    </button>

                    <button
                        onClick={() => setIsNoteOpen(!isNoteOpen)}
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-full shadow-lg shadow-rose-500/20 transition-all hover:scale-105 active:scale-95 border border-white/10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span className="text-white font-bold drop-shadow-sm">{isNoteOpen ? 'Kapat' : 'Not Bırak'}</span>
                    </button>
                </div>

                {/* Note Section */}
                {isNoteOpen && (
                    <div className="w-full max-w-lg mt-8 p-6 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl animate-in fade-in slide-in-from-bottom-4 shadow-2xl relative text-slate-800">
                        <button onClick={() => setIsNoteOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-slate-700">Bir Anı Ekle</h3>
                        <p className="text-sm text-slate-500 mb-4">Bu not, sadece yönetim panelinde görünür. Sevgiline bir sürpriz bırak.</p>
                        <NoteUploader timerId={timer.id} />
                    </div>
                )}
            </div>
        </div>
    )
}
