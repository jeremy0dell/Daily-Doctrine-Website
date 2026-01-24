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
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const json = atob(padded)
    const data = JSON.parse(json)
    if (typeof data.q === 'string' && typeof data.p === 'string') {
      return data as SharePayload
    }
    return null
  } catch {
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
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Quote text */}
        <div
          style={{
            fontSize: fontSize,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.92)',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '1000px',
            fontFamily: 'Georgia, serif',
          }}
        >
          &ldquo;{data.q}&rdquo;
        </div>

        {/* Author */}
        {data.a && (
          <div
            style={{
              marginTop: '24px',
              fontSize: '24px',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.55)',
              fontFamily: 'Georgia, serif',
            }}
          >
            — {data.a}
          </div>
        )}

        {/* Pack name */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.35)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {data.p}
        </div>

        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.18)',
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
}
