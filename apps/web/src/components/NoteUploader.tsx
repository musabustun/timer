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
            <div className="flex gap-2 justify-center pb-2 border-b border-slate-200">
                <button
                    onClick={() => setMode('TEXT')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'TEXT' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    Fotoğra/Video Notu
                </button>
                {/* Simplified to just use TEXT or MEDIA implies maybe splitting, but let's keep it simple. 
                   Actually, let's fix the buttons: 'Not Yaz' and 'Medya Yükle'
                */}
                <button
                    onClick={() => setMode('TEXT')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'TEXT' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    Not Yaz
                </button>
                <button
                    onClick={() => setMode('MEDIA')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'MEDIA' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    Medya Yükle
                </button>
            </div>

            {mode === 'TEXT' && (
                <form
                    ref={formRef}
                    action={async (formData) => {
                        await addNote(timerId, 'TEXT', formData.get('content') as string)
                        formRef.current?.reset()
                        setMode(null)
                        alert('Notun kaydedildi! ❤️')
                    }}
                    className="flex flex-col gap-2 animate-in fade-in"
                >
                    <textarea
                        name="content"
                        className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-rose-200 outline-none resize-none placeholder:text-slate-400"
                        rows={4}
                        required
                        placeholder="İçinden gelenleri yaz..."
                    />
                    <button className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-lg font-medium transition-colors shadow-sm">
                        Kaydet
                    </button>
                </form>
            )}

            {mode === 'MEDIA' && (
                <div className="bg-slate-50 border border-slate-200 border-dashed border-2 p-8 rounded-lg text-center animate-in fade-in flex flex-col items-center justify-center gap-2">
                    {uploading ? (
                        <div className="flex flex-col items-center text-rose-500">
                            <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <p className="text-sm font-medium">Yükleniyor...</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-slate-500 text-sm mb-2">Video veya Ses dosyası seç</p>
                            <input
                                type="file"
                                accept="video/*,audio/*"
                                onChange={handleUpload}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
