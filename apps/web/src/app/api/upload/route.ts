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
    try {
        const uploadDir = path.join(process.cwd(), 'public/uploads')

        // Ensure directory exists
        const { mkdir } = await import('fs/promises')
        await mkdir(uploadDir, { recursive: true })

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const filepath = path.join(uploadDir, filename)

        console.log('Uploading to:', filepath)
        console.log('CWD:', process.cwd())

        // Write file
        await writeFile(filepath, buffer)

        const publicPath = `/uploads/${filename}`
        return NextResponse.json({ success: true, path: publicPath })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ success: false, error: 'Upload failed' })
    }
}
