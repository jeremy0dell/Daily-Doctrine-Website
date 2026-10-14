import { createHash } from 'node:crypto'

const commonAnswers = {
  goal: ['discipline', 'focus', 'calm', 'reflect', 'other'],
  used: ['daily_line', 'widget', 'wallpaper', 'focus', 'saved_lines', 'trait', 'not_yet'],
  friction: ['widget_setup', 'quotes', 'ads', 'navigation', 'missing_feature', 'nothing', 'other'],
  priority: ['quotes', 'widget', 'focus', 'collections', 'personal', 'less_ads', 'nothing', 'other'],
}
const buyingAnswers = ['price', 'unclear_value', 'free_enough', 'broken', 'not_considered', 'other']
const paidAnswers = ['no_ads', 'collections', 'personal_lines', 'wallpaper', 'focus', 'other', 'not_worth_it']

export function validateFeedback(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const { id, kind, message, answers, paid, context } = input
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return null
  if (!['bug', 'suggestion', 'survey'].includes(kind) || typeof message !== 'string' || message.length > 2000 || typeof paid !== 'boolean') return null
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return null
  const normalizedAnswers = {}
  if (kind === 'survey') {
    const allowed = { ...commonAnswers, purchase: paid ? paidAnswers : buyingAnswers }
    if (Object.keys(answers).length !== Object.keys(allowed).length) return null
    for (const [question, choices] of Object.entries(allowed)) {
      if (!choices.includes(answers[question])) return null
      normalizedAnswers[question] = answers[question]
    }
  } else if (!message.trim() || Object.keys(answers).length) return null
  if (!context || typeof context !== 'object' || Array.isArray(context)) return null
  if (!['free', 'trial', 'paid'].includes(context.access)) return null
  for (const key of ['appVersion', 'build', 'iosVersion']) {
    if (typeof context[key] !== 'string' || !/^[0-9.]{1,30}$/.test(context[key])) return null
  }
  return { id: id.toLowerCase(), kind, message: message.trim(), answers: normalizedAnswers, paid,
    context: { appVersion: context.appVersion, build: context.build, iosVersion: context.iosVersion, access: context.access } }
}

export async function receiveFeedback(request, storage) {
  const respond = (body, status) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return respond({ error: 'JSON required' }, 415)
  if (Number(request.headers.get('content-length')) > 16384) return respond({ error: 'Message too large' }, 413)
  let input
  try {
    // Bound reads even when Content-Length is absent or incorrect.
    const reader = request.body?.getReader()
    if (!reader) return respond({ error: 'Message required' }, 400)
    const chunks = []; let length = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > 16384) { await reader.cancel(); return respond({ error: 'Message too large' }, 413) }
      chunks.push(Buffer.from(value))
    }
    input = validateFeedback(JSON.parse(Buffer.concat(chunks).toString('utf8')))
  } catch { return respond({ error: 'Invalid message' }, 400) }
  if (!input) return respond({ error: 'Invalid message' }, 400)
  const fingerprint = createHash('sha256').update(JSON.stringify(input)).digest('hex')
  const receipt = { id: input.id, kind: input.kind }
  const existingResponse = existing => existing.fingerprint === fingerprint
    ? respond(receipt, 200) : respond({ error: 'Submission ID already used' }, 409)
  try {
    const existing = await storage.read(input.id)
    if (existing) return existingResponse(existing)
    if (await storage.isFull()) return respond({ error: 'Feedback is temporarily unavailable. Please try again later.' }, 503)
    try {
      await storage.write(input.id, { ...input, fingerprint, receivedAt: new Date().toISOString() })
    } catch {
      // An overlapping retry may have stored this ID; never overwrite a received answer.
      const received = await storage.read(input.id)
      if (received) return existingResponse(received)
      throw new Error('Storage unavailable')
    }
    return respond(receipt, 201)
  } catch { return respond({ error: 'Feedback is temporarily unavailable. Please try again later.' }, 503) }
}
