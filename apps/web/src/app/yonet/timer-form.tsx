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
            className="p-4 border rounded-lg bg-zinc-900 border-zinc-800 space-y-4"
        >
            <h2 className="text-xl font-semibold">New Timer</h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Title</label>
                <input name="title" required className="bg-zinc-800 p-2 rounded" placeholder="Anniversary" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">Date</label>
                <input name="targetDate" type="datetime-local" required className="bg-zinc-800 p-2 rounded" />
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" name="isRecurring" id="isRecurring" />
                <label htmlFor="isRecurring" className="text-sm">Repeat Yearly?</label>
            </div>
            <button type="submit" className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-zinc-200">
                Create Timer
            </button>
        </form>
    )
}
