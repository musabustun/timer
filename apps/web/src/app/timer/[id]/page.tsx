import { getTimerDetails } from '@/actions/note'
import FullScreenTimer from '@/components/FullScreenTimer'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const timer = await getTimerDetails(id)

    if (!timer) {
        return {
            title: 'Zamanlayıcı Bulunamadı',
        }
    }

    return {
        title: timer.title,
        description: `Hedef tarih: ${new Date(timer.targetDate).toLocaleDateString()}`,
        openGraph: {
            title: timer.title,
            description: `Hedef tarih: ${new Date(timer.targetDate).toLocaleDateString()}`,
        },
    }
}

export default async function TimerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const timer = await getTimerDetails(id)

    if (!timer) redirect('/')

    return <FullScreenTimer timer={timer} />
}
