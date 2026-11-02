import type { RunOptions } from '../types.js'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/icon',
    build: ['dev:prepare', 'build'],
    beforeTest: 'pnpm playwright-core install chromium',
    test: ['typecheck', 'test'],
  })
}
