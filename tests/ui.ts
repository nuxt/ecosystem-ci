import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    branch: 'v4',
    repo: 'nuxt/ui',
    build: ['dev:prepare'],
    test: ['typecheck', 'test', 'build'],
  })
}
