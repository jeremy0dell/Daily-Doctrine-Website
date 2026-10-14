import { get, list } from '@vercel/blob'
import { writeFile } from 'node:fs/promises'

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Load the private Blob token from the linked Vercel project.')
const filename = process.argv[2]
if (!filename) throw new Error('Usage: node --env-file=.env.local Tools/export-feedback.mjs <private-output.json>')
const records = []; let cursor
do {
  const page = await list({ prefix: 'feedback/', cursor })
  for (const blob of page.blobs) {
    const result = await get(blob.url, { access: 'private', useCache: false })
    if (result?.stream) records.push(JSON.parse(await new Response(result.stream).text()))
  }
  cursor = page.hasMore ? page.cursor : undefined
} while (cursor)
records.sort((a, b) => a.receivedAt.localeCompare(b.receivedAt))
await writeFile(filename, JSON.stringify(records, null, 2), { mode: 0o600, flag: 'wx' })
const counts = {}
for (const record of records.filter(r => r.kind === 'survey')) {
  for (const [question, answer] of Object.entries(record.answers)) {
    const key = `${record.paid ? 'paid' : 'free'}:${question}:${answer}`
    counts[key] = (counts[key] ?? 0) + 1
  }
}
console.log(JSON.stringify({ records: records.length, answerCounts: counts }, null, 2))
