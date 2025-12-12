self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/icon-192x192.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Görüntüle',
                    type: 'button'
                }
            ]
        }
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        )
    }
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        }).then(function (clientList) {
            const urlToOpen = event.notification.data.url || '/yonet'

            // If a window is already open, focus it and navigate
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus()
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(urlToOpen)
            }
        })
    )
})
