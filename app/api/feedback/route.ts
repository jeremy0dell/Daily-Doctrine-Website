import { get, list, put } from '@vercel/blob'
import { receiveFeedback } from '../../lib/feedback.mjs'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  return receiveFeedback(request, {
    async read(id: string) {
      const blob = await get(`feedback/${id}.json`, { access: 'private', useCache: false })
      return blob?.stream ? JSON.parse(await new Response(blob.stream).text()) : null
    },
    async isFull() {
      const records = await list({ prefix: 'feedback/', limit: 1000 })
      return records.hasMore || records.blobs.length >= 1000
    },
    async write(id: string, record: unknown) {
      await put(`feedback/${id}.json`, JSON.stringify(record), {
        access: 'private', addRandomSuffix: false, allowOverwrite: false, contentType: 'application/json',
      })
    },
  })
}
