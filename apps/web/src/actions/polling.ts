'use server'

import { getUnreadMessages } from '@/actions/message'

export async function checkMessages() {
    return await getUnreadMessages()
}
