import test from 'node:test'
import assert from 'node:assert/strict'
import { receiveFeedback, validateFeedback } from '../app/lib/feedback.mjs'

const draft = () => ({ id: crypto.randomUUID(), kind: 'bug', message: 'The widget did not update.', answers: {}, paid: false,
  context: { appVersion: '1.4', build: '13', iosVersion: '26.5', access: 'free' } })
const survey = () => ({ ...draft(), kind: 'survey', message: '', answers: {
  goal: 'discipline', used: 'not_yet', friction: 'quotes', purchase: 'free_enough', priority: 'nothing',
} })
const request = input => new Request('https://dailydoctrine.xyz/api/feedback', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input),
})
const store = () => {
  const records = new Map()
  return { records, read: async id => records.get(id), isFull: async () => false,
    write: async (id, value) => { if (records.has(id)) throw new Error(); records.set(id, value) } }
}

test('all-negative and no-experience survey answers are accepted equally', async () => {
  const data = survey(), storage = store()
  const response = await receiveFeedback(request(data), storage)
  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), { id: data.id, kind: 'survey' })
  assert.equal(storage.records.size, 1)
})
test('paid owners answer why they bought; all five choices must be valid', () => {
  assert.equal(validateFeedback({ ...survey(), paid: true }), null)
  const data = { ...survey(), paid: true, answers: { ...survey().answers, purchase: 'not_worth_it' } }
  assert.ok(validateFeedback(data))
  delete data.answers.goal
  assert.equal(validateFeedback(data), null)
})
test('duplicates are idempotent and different answers cannot overwrite them', async () => {
  const data = draft(), storage = store()
  assert.equal((await receiveFeedback(request(data), storage)).status, 201)
  assert.equal((await receiveFeedback(request(data), storage)).status, 200)
  assert.equal((await receiveFeedback(request({ ...data, message: 'Changed' }), storage)).status, 409)
  assert.equal(storage.records.size, 1)
})
test('concurrent retries store one copy', async () => {
  const data = survey(), storage = store()
  const responses = await Promise.all([receiveFeedback(request(data), storage), receiveFeedback(request(data), storage)])
  assert.deepEqual(responses.map(r => r.status).sort(), [200, 201])
  assert.equal(storage.records.size, 1)
})
test('size limits, empty messages and invalid paths or answers are rejected', async () => {
  for (const change of [{ message: ' ' }, { message: 'x'.repeat(2001) }, { id: '../../private' }, { context: { ...draft().context, appVersion: 'unknown' } }, { kind: 'rating' }]) {
    assert.equal((await receiveFeedback(request({ ...draft(), ...change }), store())).status, 400)
  }
  assert.equal((await receiveFeedback(request({ ...draft(), message: 'x'.repeat(17000) }), store())).status, 413)
})
test('storage failure or a full store never reports successful submission', async () => {
  const data = draft()
  assert.equal((await receiveFeedback(request(data), { ...store(), write: async () => { throw new Error('offline') } })).status, 503)
  assert.equal((await receiveFeedback(request(data), { ...store(), isFull: async () => true })).status, 503)
})
test('unknown fields are discarded and the response never contains message text or storage credentials', async () => {
  const data = { ...draft(), email: 'private@example.com', task: 'private task' }, storage = store()
  const response = await receiveFeedback(request(data), storage)
  const record = [...storage.records.values()][0]
  assert.equal(record.email, undefined); assert.equal(record.task, undefined)
  assert.deepEqual(Object.keys(await response.json()).sort(), ['id', 'kind'])
})
