'use client'

import { getMessage } from '@/actions/message'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function MessagePage() {
    const params = useParams()
    const id = params.id as string
    const [message, setMessage] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isFloating, setIsFloating] = useState(false)

    useEffect(() => {
        getMessage(id).then((msg) => {
            setMessage(msg)
            // Add a slight delay before enabling floating animation
            setTimeout(() => setIsFloating(true), 100)
        })
    }, [id])

    if (!message) return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center">
            <div className="animate-pulse text-rose-300">Loading Love...</div>
        </div>
    )

    return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 overflow-hidden perspective-1000">
            {/* Background Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-rose-200 animate-float opacity-50"
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

            <div className={`relative transition-transform duration-1000 ${isOpen ? 'translate-y-32' : ''}`}>
                <div
                    onClick={() => setIsOpen(true)}
                    className={`relative w-80 h-48 bg-rose-200 cursor-pointer shadow-xl transition-all duration-500 ease-in-out ${isFloating && !isOpen ? 'animate-bounce-slow' : ''}`}
                >
                    {/* Flap */}
                    <div className={`absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-rose-300 origin-top transition-transform duration-700 z-30 ${isOpen ? 'rotate-x-180' : ''}`}></div>

                    {/* Letter */}
                    <div className={`absolute left-4 right-4 bg-white p-6 shadow-md transition-all duration-1000 ease-in-out z-20 flex flex-col items-center justify-center text-center ${isOpen ? '-translate-y-64 h-auto min-h-[200px]' : 'top-0 h-full'}`}>
                        <div className="font-serif text-zinc-800 leading-relaxed">
                            {isOpen ? (
                                <>
                                    <div className="text-2xl mb-4 text-rose-500">💌</div>
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                    <div className="text-xs text-zinc-400 mt-6 pt-4 border-t border-rose-100">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </div>
                                </>
                            ) : (
                                <div className="text-rose-200">...</div>
                            )}
                        </div>
                    </div>

                    {/* Envelope Body (Front) */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-rose-300 z-40 pointer-events-none"></div>
                    <div className="absolute left-0 top-0 w-0 h-0 border-l-[160px] border-b-[95px] border-t-[95px] border-l-rose-200 border-b-transparent border-t-transparent top-[100px] -translate-y-[95px] z-30 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-0 h-0 border-r-[160px] border-b-[95px] border-t-[95px] border-r-rose-200 border-b-transparent border-t-transparent top-[100px] -translate-y-[95px] z-30 pointer-events-none"></div>

                    {/* Seal */}
                    <div className={`absolute top-[90px] left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-500 rounded-full z-50 flex items-center justify-center text-white shadow-lg transition-all duration-500 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}>
                        ❤️
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-x-180 { transform: rotateX(180deg); }
                .origin-top { transform-origin: top; }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
            `}</style>
        </div>
    )
}
