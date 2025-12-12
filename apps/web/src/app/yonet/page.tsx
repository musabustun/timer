import { getTimers } from '@/actions/timer'
import { getAccessCode, updateAccessCode } from '@/actions/settings'
import { TimerForm } from './timer-form'
import { deleteTimer } from '@/actions/timer'
import { MessageCenter } from './MessageCenter'
import { getNotificationLogs } from '@/actions/log'

import Link from 'next/link'

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const editId = params?.editId as string
    const timers = await getTimers()
    const accessCode = await getAccessCode()
    const logs = await getNotificationLogs()

    const editingTimer = editId ? timers.find(t => t.id === editId) : null

    return (
        <div className="min-h-screen bg-cream-50 text-text-soft p-8 space-y-8 max-w-6xl mx-auto font-sans">
            <header className="flex justify-between items-center border-b border-rose-200/20 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-soft to-pink-soft bg-clip-text text-transparent">Yönetim Paneli</h1>
                    <p className="text-zinc-600 text-sm">Timer ve Bildirim Merkezi</p>
                </div>
                <div className="text-sm bg-white px-4 py-2 rounded-full shadow-sm text-zinc-500">Admin</div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Forms */}
                <div className="lg:col-span-1 space-y-8">
                    <section id="timer-form">
                        <h2 className="text-xl font-semibold mb-4 text-text-soft">
                            {editingTimer ? 'Anıyı Düzenle' : 'Yeni Anı Ekle'}
                        </h2>
                        {/* Force re-mount when key changes to reset form state for new timer vs edit */}
                        <TimerForm key={editingTimer?.id || 'new'} initialData={editingTimer} />
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-text-soft">Ayarlar</h2>
                        <form action={updateAccessCode} className="flex gap-2 items-end p-4 border border-white/20 rounded-xl bg-white/40 shadow-sm backdrop-blur-sm">
                            <div className="flex flex-col gap-1 flex-1">
                                <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Erişim Kodu</label>
                                <input
                                    name="code"
                                    defaultValue={accessCode}
                                    className="bg-white/50 border border-rose-100 p-2 rounded w-full outline-none focus:ring-1 focus:ring-rose-300 transition-all font-mono text-center"
                                />
                            </div>
                            <button className="bg-rose-soft text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200">
                                Güncelle
                            </button>
                        </form>
                    </section>
                </div>

                {/* Middle Column: Timers */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-xl font-semibold text-text-soft">Kayıtlı Anılar ({timers.length})</h2>
                    <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {timers.map(timer => (
                            <div key={timer.id} className={`group p-4 border rounded-xl transition-all shadow-sm hover:shadow-md flex flex-col gap-3 ${timer.id === editId ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-200' : 'bg-white/60 border-white/50 hover:bg-white'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-lg text-text-soft">{timer.title}</div>
                                        <div className="text-xs text-rose-400 font-mono mt-1 bg-rose-50 inline-block px-2 py-1 rounded">
                                            {new Date(timer.targetDate).toLocaleDateString('tr-TR')}
                                            {timer.isRecurring && (timer.recurrence === 'monthly' ? ' (Aylık)' : ' (Yıllık)')}
                                        </div>
                                    </div>
                                    {timer.imageUrl && (
                                        <div className="w-10 h-10 rounded-lg bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${timer.imageUrl})` }}></div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-dashed border-rose-100">
                                    <Link
                                        href={`/yonet?editId=${timer.id}`}
                                        scroll={false}
                                        className="text-blue-400 hover:text-blue-500 text-xs font-semibold px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                                    >
                                        Düzenle
                                    </Link>
                                    <form action={deleteTimer.bind(null, timer.id)}>
                                        <button className="text-red-400 hover:text-red-500 text-xs font-semibold px-2 py-1 hover:bg-red-50 rounded transition-colors">Sil</button>
                                    </form>
                                </div>
                            </div>
                        ))}
                        {timers.length === 0 && (
                            <p className="text-zinc-400 text-center py-10 italic">Henüz timer yok.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Messages & Logs */}
                <div className="lg:col-span-1 space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-text-soft">Mesaj Gönder</h2>
                        <MessageCenter />
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-text-soft">Son Bildirimler</h2>
                        <div className="space-y-2 bg-white/40 p-4 rounded-xl border border-white/20 h-64 overflow-y-auto font-mono text-xs">
                            {logs.map(log => (
                                <div key={log.id} className="pb-2 mb-2 border-b border-rose-100 last:border-0">
                                    <div className="font-bold text-rose-500">{log.title}</div>
                                    <div className="text-zinc-600 truncate">{log.body}</div>
                                    <div className="text-zinc-400 text-[10px] mt-1 text-right">{new Date(log.sentAt).toLocaleString('tr-TR')}</div>
                                </div>
                            ))}
                            {logs.length === 0 && <div className="text-center text-zinc-400 py-4">Henüz kayıt yok.</div>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
