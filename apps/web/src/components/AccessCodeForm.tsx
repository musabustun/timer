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
                    <p className="text-zinc-400">Enter access code to view timers</p>
                </div>

                <form action={action} className="space-y-4">
                    <input
                        type="text"
                        name="code"
                        placeholder="Access Code"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center text-xl tracking-widest placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        autoComplete="off"
                    />
                    {state?.error && (
                        <p className="text-red-500 text-sm text-center">{state.error}</p>
                    )}
                    <button
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium p-4 rounded-lg transition-colors"
                    >
                        {isPending ? 'Checking...' : 'Enter'}
                    </button>
                </form>
            </div>
        </div>
    )
}
