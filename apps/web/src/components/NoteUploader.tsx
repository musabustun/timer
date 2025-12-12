'use client'

import { addNote } from '@/actions/note'
import { useState, useRef } from 'react'

export function NoteUploader({ timerId }: { timerId: string }) {
    const [mode, setMode] = useState<'TEXT' | 'MEDIA' | null>(null)
    const [uploading, setUploading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.[0]) return
        setUploading(true)

        const file = e.target.files[0]
        const type = file.type.startsWith('video') ? 'VIDEO' : 'AUDIO'

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) {
                await addNote(timerId, type, data.url)
                setMode(null)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button onClick={() => setMode('TEXT')} className="bg-zinc-800 px-4 py-2 rounded">Write Note</button>
                <button onClick={() => setMode('MEDIA')} className="bg-zinc-800 px-4 py-2 rounded">Upload Media</button>
            </div>

            {mode === 'TEXT' && (
                <form
                    ref={formRef}
                    action={async (formData) => {
                        await addNote(timerId, 'TEXT', formData.get('content') as string)
                        formRef.current?.reset()
                        setMode(null)
                    }}
                    className="flex flex-col gap-2"
                >
                    <textarea name="content" className="bg-zinc-900 border border-zinc-800 rounded p-2" rows={3} required />
                    <button className="bg-blue-600 text-white p-2 rounded">Add Note</button>
                </form>
            )}

            {mode === 'MEDIA' && (
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-center">
                    {uploading ? (
                        <p>Uploading...</p>
                    ) : (
                        <input type="file" accept="video/*,audio/*" onChange={handleUpload} className="w-full" />
                    )}
                </div>
            )}
        </div>
    )
}
