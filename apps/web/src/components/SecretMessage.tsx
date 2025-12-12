'use client'

import { getMessage } from '@/actions/message'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import confetti from 'canvas-confetti'

export default function MessagePage() {
    const params = useParams()
    const id = params.id as string
    const [message, setMessage] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isFloating, setIsFloating] = useState(false)

    useEffect(() => {
        getMessage(id).then((msg) => {
            setMessage(msg)
            setTimeout(() => setIsFloating(true), 100)
        })
    }, [id])

    useEffect(() => {
        if (isOpen) {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio: number, opts: any) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        }
    }, [isOpen])

    if (!message) return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center">
            <div className="animate-pulse text-rose-300">Loading Love...</div>
        </div>
    )

    return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 overflow-hidden perspective-1000">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

            {/* Background Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-rose-300/40 animate-float"
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
                    onClick={() => !isOpen && setIsOpen(true)}
                    className={`relative w-80 h-48 bg-gradient-to-br from-rose-100 to-rose-200 cursor-pointer shadow-2xl transition-all duration-500 ease-in-out ${isFloating && !isOpen ? 'animate-bounce-slow' : ''}`}
                >
                    {/* Flap */}
                    <div className={`absolute top-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-rose-300 origin-top transition-transform duration-700 z-30 drop-shadow-md ${isOpen ? 'rotate-x-180 z-10' : ''}`} style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}></div>

                    {/* Letter */}
                    <div className={`absolute left-4 right-4 bg-white p-6 shadow-md transition-all duration-1000 ease-in-out z-20 flex flex-col items-center justify-center text-center ${isOpen ? '-translate-y-80 h-auto min-h-[250px] rotate-1 scale-105' : 'top-0 h-full scale-95 opacity-0'}`}>

                        <div className="font-[cursive] text-zinc-800 leading-[2em] w-full" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                            {isOpen ? (
                                <>
                                    <div className="text-3xl mb-4 text-rose-500 animate-pulse">💌</div>
                                    <p className="whitespace-pre-wrap text-lg relative z-10">{message.content}</p>
                                    <div className="text-xs text-zinc-400 mt-8 pt-4 border-t border-rose-100">
                                        {new Date(message.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* Envelope Body (Bottom) */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-rose-200 z-30 pointer-events-none drop-shadow-lg"></div>

                    {/* Envelope Body (Sides) */}
                    <div className="absolute left-0 top-0 w-0 h-0 border-l-[160px] border-b-[95px] border-t-[95px] border-l-rose-100 border-b-transparent border-t-transparent top-[100px] -translate-y-[95px] z-30 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-0 h-0 border-r-[160px] border-b-[95px] border-t-[95px] border-r-rose-100 border-b-transparent border-t-transparent top-[100px] -translate-y-[95px] z-30 pointer-events-none"></div>

                    {/* Wax Seal */}
                    <div className={`absolute top-[90px] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full z-40 flex items-center justify-center text-white shadow-lg transition-all duration-500 scale-100 cursor-pointer hover:scale-110 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #ff4d4d, #cc0000)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div className="border-2 border-rose-800/30 rounded-full w-12 h-12 flex items-center justify-center text-2xl drop-shadow-sm">
                            ❤️
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-x-180 { transform: rotateX(180deg); }
                .origin-top { transform-origin: top; }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
            `}</style>
        </div>
    )
}
