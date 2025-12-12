import { getTimerDetails } from '@/actions/note'
import FullScreenTimer from '@/components/FullScreenTimer'
import { redirect } from 'next/navigation'

export default async function TimerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const timer = await getTimerDetails(id)

    if (!timer) redirect('/')

    return <FullScreenTimer timer={timer} />
}
