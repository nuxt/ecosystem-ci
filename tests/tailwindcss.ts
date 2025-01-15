import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt-modules/tailwindcss',
    branch: 'main',
    build: ['dev:prepare', 'build'],
    test: ['test'],
  })
}
