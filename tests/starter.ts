import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/starter',
    branch: 'v3',
    build: ['pnpm install', 'build'],
    test: [],
  })
}
