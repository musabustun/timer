'use client'

import { createTimer } from '@/actions/timer'
import { useRef, useState } from 'react'
import { TR } from 'shared/src/tr'

export function TimerForm({ initialData }: { initialData?: any }) {
    const ref = useRef<HTMLFormElement>(null)
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')
    const [uploading, setUploading] = useState(false)

    // Reset URL if initialData changes (e.g. switching between timers)
    // In a real app we might need useEffect, but key change re-mounts component

    // We'll use a key on the parent to force re-mount when editing different timers

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return
        setUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', e.target.files[0])

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            if (data.success) {
                setImageUrl(data.path)
            }
        } catch (error) {
            console.error('Upload failed', error)
            alert('Yükleme başarısız!')
        } finally {
            setUploading(false)
        }
    }

    return (
        <form
            ref={ref}
            action={async (formData) => {
                await createTimer(formData)
                ref.current?.reset()
                setImageUrl('')
                // If editing, we might want to redirect or clear query params, but simplest is just stay
                if (initialData) {
                    window.location.href = '/yonet' // Clear edit mode
                }
            }}
            className={`p-6 border ${initialData ? 'border-rose-400 bg-rose-50/50' : 'border-white/10 bg-white/5'} rounded-xl backdrop-blur-md space-y-4 shadow-xl transition-colors duration-300`}
        >
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent flex justify-between items-center">
                {initialData ? 'Anıyı Düzenle' : TR.labels.create}
                {initialData && (
                    <a href="/yonet" className="text-xs text-zinc-400 font-normal hover:text-rose-500 cursor-pointer">İptal</a>
                )}
            </h2>

            {initialData && <input type="hidden" name="id" value={initialData.id} />}

            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">{TR.labels.title}</label>
                <input
                    name="title"
                    required
                    defaultValue={initialData?.title}
                    className="bg-white/50 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none transition-all placeholder:text-zinc-400"
                    placeholder="Örn: Yıldönümü"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">{TR.labels.date}</label>
                <input
                    name="targetDate"
                    type="datetime-local"
                    required
                    defaultValue={initialData ? new Date(new Date(initialData.targetDate).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                    className="bg-white/50 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">{TR.labels.recurrence}</label>
                <select
                    name="recurrence"
                    defaultValue={initialData?.recurrence || 'none'}
                    className="bg-white/50 border border-white/10 p-3 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none"
                >
                    <option value="none">{TR.labels.none}</option>
                    <option value="monthly">{TR.labels.monthly}</option>
                    <option value="yearly">{TR.labels.yearly}</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-400">{TR.labels.image}</label>
                <div className="flex gap-2 items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="file:bg-rose-100 file:border-0 file:rounded-full file:px-4 file:py-2 file:text-rose-600 file:font-medium text-sm text-zinc-500"
                    />
                    {uploading && <span className="text-xs animate-pulse text-rose-400">Yükleniyor...</span>}
                </div>
                {imageUrl && (
                    <div className="mt-2 relative group w-full h-32 bg-cover bg-center rounded-lg border border-rose-200" style={{ backgroundImage: `url(${imageUrl})` }}>
                        <div className="hidden group-hover:flex absolute inset-0 bg-black/50 items-center justify-center text-white text-xs cursor-pointer" onClick={() => setImageUrl('')}>Kaldır</div>
                    </div>
                )}
                <input type="hidden" name="imageUrl" value={imageUrl} />
            </div>

            <button type="submit" disabled={uploading} className="w-full bg-gradient-to-r from-rose-soft to-pink-soft hover:from-rose-500 hover:to-pink-500 text-white p-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-rose-soft/20 disabled:opacity-50">
                {initialData ? TR.labels.update : TR.labels.create}
            </button>
        </form>
    )
}
