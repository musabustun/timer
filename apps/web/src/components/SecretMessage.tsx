'use client'

import { getMessage } from '@/actions/message'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function MessagePage() {
    const params = useParams()
    const id = params.id as string
    const [message, setMessage] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Fetch message client side for animation effect
        // In real app, could be server component, but we want the "envelope" effect
        getMessage(id).then(setMessage)
    }, [id])

    if (!message) return <div className="min-h-screen bg-cream-50 flex items-center justify-center text-text-soft">Loading Love...</div>

    return (
        <div className="min-h-screen bg-cream-gradient flex items-center justify-center p-4 overflow-hidden relative">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-rose-soft/20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            fontSize: `${Math.random() * 2 + 1}rem`
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            <div className="relative z-10 max-w-md w-full perspective-1000">
                {!isOpen ? (
                    <div
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer bg-white p-8 rounded-lg shadow-2xl transform transition-transform hover:scale-105 border-4 border-rose-100 flex flex-col items-center gap-4 group"
                    >
                        <div className="text-6xl group-hover:animate-bounce">💌</div>
                        <h1 className="text-2xl font-serif text-text-soft font-bold">You have a secret message</h1>
                        <p className="text-sm text-zinc-400">Tap to open</p>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50 animate-in zoom-in-50 duration-500">
                        <div className="text-center space-y-6">
                            <div className="text-4xl animate-pulse">💝</div>
                            <p className="text-xl md:text-2xl font-serif text-text-soft leading-relaxed">
                                &ldquo;{message.content}&rdquo;
                            </p>
                            <div className="text-xs text-zinc-400 font-mono mt-8">
                                Sent with love on {new Date(message.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
