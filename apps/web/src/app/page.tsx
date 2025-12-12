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
    <main className="min-h-screen bg-black text-white p-4 md:p-8 pb-24">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tighter">My Timers</h1>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
      </header>
      <TimerList timers={timers} />
      <NotificationManager timers={timers} />
    </main>
  )
}
