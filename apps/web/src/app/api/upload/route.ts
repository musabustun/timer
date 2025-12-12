import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // The original filename, uploadDir, and filepath are kept for context,
    // but the new logic uses a simpler path.
    const filename = `${Date.now()}-${file.name}`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const filepath = path.join(uploadDir, filename)

    try {
        const publicPath = `/uploads/${file.name}`

        // In a real app we'd handle unique filenames better
        await writeFile(`./public${publicPath}`, buffer)

        return NextResponse.json({ success: true, path: publicPath })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ success: false, error: 'Upload failed' })
    }
}
