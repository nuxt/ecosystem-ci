import type { RunOptions } from '../types.js'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/scripts',
    beforeTest: 'pnpm playwright-core install chromium',
    build: ['dev:prepare'],
    test: ['test', 'build', 'typecheck'],
    overrides: {
      esbuild: 'latest',
    },
  })
}
