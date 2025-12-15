import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/nuxt.com',
    build: ['pnpm nuxt prepare', 'pnpm exec playwright install'],
    test: ['test:types', 'pnpm vitest run'],
  })
}
