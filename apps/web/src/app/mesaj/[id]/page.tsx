import SecretMessage from '@/components/SecretMessage'
import { getMessage } from '@/actions/message'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const id = (await params).id
    const message = await getMessage(id)

    if (!message) {
        return {
            title: 'Mesaj Bulunamadı',
        }
    }

    const title = 'San bir mesaj var! 💌'
    const description = message.isSecret ? 'Okumak için tıkla...' : message.content.substring(0, 100)

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    }
}

export default function Page() {
    return <SecretMessage />
}
