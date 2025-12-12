'use client'

import { verifyAccessCode } from '@/actions/public-auth'
import { useActionState } from 'react'

export function AccessCodeForm() {
    const [state, action, isPending] = useActionState(verifyAccessCode, null)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Welcome
                    </h1>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-soft to-pink-soft bg-clip-text text-transparent animate-pulse">
                        Krem Anılar ❤️
                    </h1>
                    <form action={action} className="flex flex-col gap-4 w-full max-w-xs animate-in slide-in-from-bottom-4 duration-1000">
                        <input
                            type="text"
                            name="code"
                            placeholder="Erişim Kodu..."
                            className="bg-white/50 border border-rose-200 text-center p-3 rounded-full focus:ring-2 focus:ring-rose-300 outline-none transition-all placeholder:text-rose-300/50"
                        />
                        <button
                            disabled={isPending}
                            className="bg-gradient-to-r from-rose-soft to-pink-soft text-white p-3 rounded-full font-medium hover:scale-105 transition-transform disabled:opacity-50 shadow-lg shadow-rose-200/50"
                        >
                            {isPending ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
                        </button>
                        {state?.error && (
                            <p className="text-red-400 text-sm text-center animate-bounce">{state.error}</p>
                        )}
                    </form>
                </div>
            </div>
        </div >
    )
}
