import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/content',
    build: ['dev:prepare', 'prepack'],
    test: ['test'],
  })
}
