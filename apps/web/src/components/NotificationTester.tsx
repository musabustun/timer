'use client'

export function NotificationTester() {
    return (
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900 flex justify-between items-center">
            <div>
                <div className="font-bold">Test Notification</div>
                <div className="text-xs text-zinc-400">Send a test push/local notification to yourself</div>
            </div>
            <button
                className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-500 transition-colors"
                onClick={() => {
                    if (Notification.permission === 'granted') {
                        new Notification('Love Timer', { body: 'Just checking in on you! ❤️' })
                    } else {
                        Notification.requestPermission().then(p => {
                            if (p === 'granted') new Notification('Love Timer', { body: 'Notifications enabled!' })
                        })
                    }
                }}
            >
                Send Love
            </button>
        </div>
    )
}
