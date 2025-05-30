import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const config = await request.json()
    
    // Here you would call your backend NestJS generator service
    const response = await fetch(process.env.BACKEND_URL + '/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    
    if (!response.ok) {
      throw new Error('Failed to generate project')
    }
    
    const data = await response.blob()
    
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${config.projectName}.zip"`
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate project' },
      { status: 500 }
    )
  }
}