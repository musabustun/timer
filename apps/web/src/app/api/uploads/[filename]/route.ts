import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { readFile } from 'fs/promises'

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params

    if (filename.includes('..')) {
        return new NextResponse('Invalid filename', { status: 400 })
    }

    const filepath = path.join(process.cwd(), 'public/uploads', filename)

    try {
        const fileBuffer = await readFile(filepath)

        const ext = path.extname(filename).toLowerCase()
        let contentType = 'application/octet-stream'
        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
        else if (ext === '.png') contentType = 'image/png'
        else if (ext === '.gif') contentType = 'image/gif'
        else if (ext === '.webp') contentType = 'image/webp'
        else if (ext === '.mp4') contentType = 'video/mp4'
        else if (ext === '.webm') contentType = 'video/webm'
        else if (ext === '.mp3') contentType = 'audio/mpeg'

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        })
    } catch (error) {
        return new NextResponse('File not found', { status: 404 })
    }
}
