import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/cli',
    build: ['build', 'pnpm nuxt prepare playground'],
    test: ['test:dist', 'test:unit'],
  })
}
