import { Timer } from '@prisma/client'
import { TimerCard } from './TimerCard'

export function TimerList({ timers }: { timers: any[] }) {
    // We use any[] because timers might include relation 'notes' which is not in basic Timer type
    // Use a proper type in production

    if (timers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
                <p>No timers set.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
            {timers.map(timer => (
                <TimerCard key={timer.id} timer={timer} />
            ))}
        </div>
    )
}
