import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    overrides: {
      vitest: '^3.2.0',
    },
    repo: 'nuxt-modules/tailwindcss',
    branch: 'main',
    build: ['dev:prepare', 'build'],
    test: ['test'],
  })
}
