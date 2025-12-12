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
                setTimeLeft('Here!')
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

    const handleRemindMe = () => {
        // Local Notification Logic
        if (Notification.permission === 'granted') {
            new Notification(`Reminder Set: ${timer.title}`, {
                body: 'You will be notified 24h before.'
            })
            alert('Reminder set!')
        } else {
            Notification.requestPermission().then(p => {
                if (p === 'granted') {
                    new Notification('Notifications Enabled')
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
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-30 blur-sm scale-110"
                    style={{ backgroundImage: `url(${timer.imageUrl})` }}
                ></div>
            )}

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-600/20 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-tr from-white to-rose-200 bg-clip-text text-transparent drop-shadow-2xl">
                        {timeLeft || 'Loading...'}
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-light text-rose-200/80 tracking-widest uppercase">
                        {timer.title}
                    </h2>
                    <div className="text-sm text-pink-400/60 font-mono">
                        Target: {target?.toLocaleDateString()}
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleRemindMe}
                        className="group flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-400 group-hover:text-rose-300">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span className="text-rose-100 font-medium">Remind Me</span>
                    </button>

                    <button
                        onClick={() => setIsNoteOpen(!isNoteOpen)}
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-full shadow-lg shadow-rose-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <span className="text-white font-bold">Leave Note</span>
                    </button>
                </div>

                {/* Note Section */}
                {isNoteOpen && (
                    <div className="w-full max-w-lg mt-8 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-xl font-semibold mb-4 text-rose-200">Add Memory</h3>
                        <NoteUploader timerId={timer.id} />
                    </div>
                )}

                {/* Existing Notes Display */}
                {timer.notes && timer.notes.length > 0 && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 opacity-80">
                        {timer.notes.map((note: any) => (
                            <div key={note.id} className="bg-black/20 border border-white/5 p-4 rounded-lg backdrop-blur-sm">
                                {note.type === 'TEXT' && <p className="text-zinc-300">{note.content}</p>}
                                {note.type === 'VIDEO' && <video src={note.content} controls className="w-full rounded" />}
                                {note.type === 'AUDIO' && <audio src={note.content} controls className="w-full" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
