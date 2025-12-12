'use client'

import { sendMessage } from '@/actions/message'
import { useRef } from 'react'

export function MessageCenter() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-soft to-pink-soft bg-clip-text text-transparent">
                Send Notification
            </h2>
            <form
                ref={ref}
                action={async (formData) => {
                    await sendMessage(
                        formData.get('content') as string,
                        formData.get('isSecret') === 'on'
                    )
                    ref.current?.reset()
                    alert('Message Sent!')
                }}
                className="space-y-4"
            >
                <div>
                    <label className="text-sm text-zinc-400">Message Content</label>
                    <textarea
                        name="content"
                        required
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-soft outline-none transition-all mt-1"
                        placeholder="I love you..."
                    />
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isSecret" id="isSecret" className="w-4 h-4 accent-rose-500 rounded" />
                    <label htmlFor="isSecret" className="text-sm cursor-pointer select-none">Secret Message (Click to reveal)</label>
                </div>

                <button className="w-full bg-cream-100 text-text-soft px-4 py-2 rounded font-medium hover:bg-white transition-colors">
                    Send Notification
                </button>
            </form>
        </div>
    )
}
