import type { Metadata } from 'next'

interface SharePayload {
  q: string    // quote text
  a?: string   // author (optional)
  p: string    // pack name
}

function decodePayload(payload: string): SharePayload | null {
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const json = Buffer.from(padded, 'base64').toString('utf-8')
    const data = JSON.parse(json)
    if (typeof data.q === 'string' && typeof data.p === 'string') {
      return data as SharePayload
    }
    return null
  } catch {
    return null
  }
}

type Props = {
  params: Promise<{ payload: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { payload } = await params
  const data = decodePayload(payload)

  if (!data) {
    return {
      title: 'Daily Doctrine',
      description: 'Daily inspirational quotes delivered to your iPhone',
    }
  }

  const description = data.a
    ? `"${data.q}" — ${data.a}`
    : `"${data.q}"`

  return {
    title: `${data.p} | Daily Doctrine`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${data.p} | Daily Doctrine`,
      description: description.slice(0, 160),
      images: [{
        url: `/api/og?payload=${payload}`,
        width: 1200,
        height: 630,
        alt: 'Quote from Daily Doctrine',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.p} | Daily Doctrine`,
      description: description.slice(0, 160),
      images: [`/api/og?payload=${payload}`],
    },
  }
}

export default async function SharePage({ params }: Props) {
  const { payload } = await params
  const data = decodePayload(payload)

  if (!data) {
    return (
      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.errorTitle}>Quote not found</h1>
          <p style={styles.errorText}>This link may be invalid or expired.</p>
        </div>
        <a href="/" style={styles.secondaryButton}>
          Go to Daily Doctrine
        </a>
      </main>
    )
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <blockquote style={styles.quote}>
          &ldquo;{data.q}&rdquo;
        </blockquote>

        {data.a && (
          <p style={styles.author}>— {data.a}</p>
        )}

        <p style={styles.packName}>{data.p}</p>
      </div>

      <div style={styles.cta}>
        <a
          href={`dailydoctrine://s/${payload}`}
          style={styles.primaryButton}
        >
          Open in App
        </a>
        <a
          href="https://apps.apple.com/app/daily-doctrine/id6740043938"
          style={styles.secondaryButton}
        >
          Get Daily Doctrine
        </a>
      </div>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  card: {
    backgroundColor: '#141414',
    borderRadius: '16px',
    padding: '2.5rem',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  quote: {
    fontSize: '1.5rem',
    fontWeight: 500,
    fontFamily: 'Georgia, serif',
    color: 'rgba(255, 255, 255, 0.92)',
    lineHeight: 1.6,
    margin: 0,
  },
  author: {
    marginTop: '1.5rem',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.55)',
    fontStyle: 'italic',
    margin: 0,
  },
  packName: {
    marginTop: '1rem',
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.35)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    margin: 0,
  },
  cta: {
    marginTop: '2rem',
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
  primaryButton: {
    display: 'block',
    padding: '1rem 2rem',
    backgroundColor: 'rgb(217, 191, 140)',
    color: '#000',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 600,
    textAlign: 'center',
  },
  secondaryButton: {
    display: 'block',
    padding: '1rem 2rem',
    backgroundColor: '#1f1f1f',
    color: 'rgba(255, 255, 255, 0.92)',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 500,
    textAlign: 'center',
    border: '1px solid #333',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.92)',
    margin: 0,
    marginBottom: '0.5rem',
  },
  errorText: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.55)',
    margin: 0,
  },
}
