import { getTimerDetails } from '@/actions/note'
import { NoteUploader } from '@/components/NoteUploader'
import { TimerCard } from '@/components/TimerCard'
import { redirect } from 'next/navigation'

export default async function TimerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const timer = await getTimerDetails(id)

    if (!timer) redirect('/')

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-20 space-y-8">
            <div className="max-w-xl mx-auto space-y-8">
                <TimerCard timer={timer} />

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Memories & Notes</h2>
                    <NoteUploader timerId={timer.id} />

                    <div className="space-y-4 mt-8">
                        {timer.notes.map(note => (
                            <div key={note.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                {note.type === 'TEXT' && <p className="whitespace-pre-wrap">{note.content}</p>}
                                {note.type === 'VIDEO' && (
                                    <video src={note.content} controls className="w-full rounded-lg" />
                                )}
                                {note.type === 'AUDIO' && (
                                    <audio src={note.content} controls className="w-full" />
                                )}
                                <div className="text-xs text-zinc-500 mt-2">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
