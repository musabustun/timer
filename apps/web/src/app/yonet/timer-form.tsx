'use client'

import { createTimer } from '@/actions/timer'
import { useRef } from 'react'

export function TimerForm() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={ref}
            action={async (formData) => {
                await createTimer(formData)
                ref.current?.reset()
            }}
            className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md space-y-4 shadow-xl"
        >
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                New Memory
            </h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Title</label>
                <input name="title" required className="bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Anniversary, Birthday..." />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Date</label>
                <input name="targetDate" type="datetime-local" required className="bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Recurrence</label>
                <select name="recurrence" className="bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none">
                    <option value="none">None</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Background Image</label>
                <input name="imageUrl" type="text" placeholder="/uploads/..." className="bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-soft outline-none transition-all placeholder:text-zinc-600" />
                <p className="text-xs text-zinc-500">Upload file via API first or use external URL</p>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-rose-soft to-pink-soft hover:from-rose-500 hover:to-pink-500 text-white p-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-rose-soft/20">
                Create Memory
            </button>
        </form>
    )
}
