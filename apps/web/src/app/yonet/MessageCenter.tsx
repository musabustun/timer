'use client'

import { sendMessage } from '@/actions/message'
import { logNotification } from '@/actions/timer'
import { useRef } from 'react'

export function MessageCenter() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={ref}
            action={async (formData) => {
                const content = formData.get('content') as string
                const isSecret = formData.get('isSecret') === 'on'

                if (content) {
                    await sendMessage(content, isSecret)
                    // Log the actual content for admin reference, but mark as Secret
                    await logNotification(isSecret ? 'Gizli Mesaj' : 'Mesaj', isSecret ? `[GİZLİ] ${content}` : content)
                    ref.current?.reset()
                    alert('Mesaj Gönderildi!')
                }
            }}
            className="p-6 border border-white/20 rounded-xl bg-white/40 shadow-sm backdrop-blur-sm space-y-4"
        >
            <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Mesaj İçeriği</label>
                <textarea
                    name="content"
                    required
                    rows={3}
                    className="bg-white/50 border border-rose-100 p-3 rounded-lg w-full outline-none focus:ring-1 focus:ring-rose-300 transition-all placeholder:text-zinc-400"
                    placeholder="Seni seviyorum..."
                />
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" name="isSecret" id="secret" className="w-4 h-4 text-rose-500 rounded focus:ring-rose-400" />
                <label htmlFor="secret" className="text-sm text-zinc-600 cursor-pointer select-none">Gizli Mesaj (Zarf animasyonu ile açılır)</label>
            </div>

            <button className="w-full bg-rose-soft text-white py-3 rounded-lg hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200 font-medium">
                Gönder
            </button>
        </form>
    )
}
