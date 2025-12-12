'use client'

import { verifyAccessCode } from '@/actions/public-auth'
import { useActionState } from 'react'

export function AccessCodeForm() {
    const [state, action, isPending] = useActionState(verifyAccessCode, null)

    return (

        <div className="relative flex min-h-screen flex-col items-center justify-center bg-color-cream-50 overflow-hidden p-4">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-cream-gradient opacity-80 z-0 pointer-events-none"></div>

            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-600/10 blur-[80px] rounded-full animate-float"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl border border-white/60 animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-soft-gradient">
                                Hoş Geldin
                            </h1>
                            <p className="text-slate-500 mt-2 text-sm">Özel alanına giriş yap</p>
                        </div>

                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-200 to-pink-200 flex items-center justify-center animate-pulse">
                            <span className="text-2xl">❤️</span>
                        </div>
                    </div>

                    <form action={action} className="flex flex-col gap-5 w-full animate-in slide-in-from-bottom-4 duration-1000 delay-100">
                        <div className="space-y-1">
                            <input
                                type="text"
                                name="code"
                                placeholder="Erişim Kodu"
                                className="w-full bg-white/70 border border-stone-200 text-center p-4 rounded-2xl focus:ring-2 focus:ring-rose-200 focus:border-rose-300 outline-none transition-all placeholder:text-stone-400 text-stone-700 font-medium"
                            />
                        </div>

                        <button
                            disabled={isPending}
                            className="bg-gradient-to-r from-rose-soft to-pink-soft text-white p-4 rounded-2xl font-bold tracking-wide hover:shadow-lg hover:shadow-rose-300/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isPending ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
                        </button>

                        {state?.error && (
                            <p className="text-rose-500 text-sm text-center font-medium bg-rose-50/50 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">{state.error}</p>
                        )}
                    </form>
                </div>

                <p className="text-center mt-8 text-stone-400 text-xs">
                    Güvenli ve gizli bağlantı
                </p>
            </div>
        </div >
    )
}
