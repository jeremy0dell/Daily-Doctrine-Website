import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface SharePayload {
  q: string
  a?: string
  p: string
}

function decodePayload(payload: string): SharePayload | null {
  try {
    // Convert base64url to base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)

    // Decode base64 to string (Edge-compatible)
    const binaryString = atob(padded)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const json = new TextDecoder().decode(bytes)

    const data = JSON.parse(json)
    if (typeof data.q === 'string' && typeof data.p === 'string') {
      return data as SharePayload
    }
    return null
  } catch (e) {
    console.error('Decode error:', e)
    return null
  }
}

function getQuoteFontSize(text: string): number {
  const len = text.length
  if (len < 80) return 48
  if (len < 150) return 40
  if (len < 250) return 34
  if (len < 350) return 28
  return 24
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const payload = searchParams.get('payload')

    if (!payload) {
      return new Response('Missing payload parameter', { status: 400 })
    }

    const data = decodePayload(payload)

    if (!data) {
      return new Response('Invalid payload', { status: 400 })
    }

    const fontSize = getQuoteFontSize(data.q)

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0a0a0a',
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: fontSize,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.92)',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 1000,
              display: 'flex',
            }}
          >
            "{data.q}"
          </div>

          {data.a ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.55)',
                display: 'flex',
              }}
            >
              — {data.a}
            </div>
          ) : null}

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.35)',
              letterSpacing: 2,
              display: 'flex',
            }}
          >
            {data.p.toUpperCase()}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 20,
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.18)',
              display: 'flex',
            }}
          >
            Daily Doctrine
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error('OG generation error:', e)
    return new Response(`Error generating image: ${e}`, { status: 500 })
  }
}
