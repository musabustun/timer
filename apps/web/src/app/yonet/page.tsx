import { getTimers } from '@/actions/timer'
import { getAccessCode, updateAccessCode } from '@/actions/settings'
import { TimerForm } from './timer-form'
import { deleteTimer } from '@/actions/timer'

export default async function AdminPage() {
    const timers = await getTimers()
    const accessCode = await getAccessCode()

    return (
        <div className="min-h-screen bg-black text-white p-8 space-y-8 max-w-4xl mx-auto">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <div className="text-sm text-zinc-500">Managed by You</div>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Settings</h2>
                <form action={updateAccessCode} className="flex gap-4 items-end p-4 border border-zinc-800 rounded-lg bg-zinc-900">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm text-zinc-400">Home Access Code</label>
                        <input
                            name="code"
                            defaultValue={accessCode}
                            className="bg-zinc-800 p-2 rounded w-full"
                        />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Update
                    </button>
                </form>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                <div>
                    <TimerForm />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Existing Timers ({timers.length})</h2>
                    <div className="space-y-2">
                        {timers.map(timer => (
                            <div key={timer.id} className="p-3 border border-zinc-800 rounded bg-zinc-900 flex justify-between items-center">
                                <div>
                                    <div className="font-bold">{timer.title}</div>
                                    <div className="text-xs text-zinc-400">
                                        {new Date(timer.targetDate).toLocaleDateString()} {timer.isRecurring && ' (Yearly)'}
                                    </div>
                                </div>
                                <form action={deleteTimer.bind(null, timer.id)}>
                                    <button className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                                </form>
                            </div>
                        ))}
                        {timers.length === 0 && (
                            <p className="text-zinc-500 text-sm">No timers yet.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
