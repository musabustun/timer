import { cookies } from 'next/headers'
import { AccessCodeForm } from '@/components/AccessCodeForm'
import { getTimers } from '@/actions/timer'
import { TimerList } from '@/components/TimerList'

import { NotificationManager } from '@/components/NotificationManager'

export default async function Home() {
  const cookieStore = await cookies()
  const hasAccess = cookieStore.has('public_access')

  if (!hasAccess) {
    return <AccessCodeForm />
  }

  const timers = await getTimers()

  return (
    <main className="min-h-screen bg-color-cream-50 relative overflow-hidden p-4 md:p-8 pb-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-cream-gradient opacity-80 z-0 pointer-events-none"></div>

      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-rose-600/10 blur-[100px] rounded-full animate-float"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-soft-gradient">Zamanlayıcılarım</h1>
            <p className="text-text-soft/80 font-medium mt-1">Özel anlarını takip et.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 shadow-lg shadow-rose-soft/30 animate-pulse"></div>
        </header>
        <TimerList timers={timers} />
        <NotificationManager timers={timers} />
      </div>
    </main>
  )
}
