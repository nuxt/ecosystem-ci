import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/module-builder',
    build: ['pnpm -r dev:prepare'],
    test: ['test'],
  })
}
