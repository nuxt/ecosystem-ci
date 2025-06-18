import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    branch: 'v3',
    repo: 'vuejs/pinia',
    build: ['pnpm run -r dev:prepare', 'build'],
    test: ['pnpm vitest packages/nuxt'],
  })
}
