import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    branch: 'dev',
    repo: 'nuxt/ui',
    build: ['dev:prepare'],
    test: ['typecheck', 'build', 'build:docs'],
  })
}
