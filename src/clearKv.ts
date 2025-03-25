import { getKv } from './job.ts'

const kv = await getKv()

const keys = kv.list({ prefix: [] }) // If you want to list all keys without a specific prefix

for await (const entry of keys) {
    await kv.delete(entry.key)
}

console.log('done')
