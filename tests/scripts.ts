import type { RunOptions } from '../types.js'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt/scripts',
    beforeTest: 'pnpm playwright-core install chromium',
    build: ['dev:prepare'],
    test: ['test', 'build', 'dev:prepare', 'typecheck'],
    overrides: {
      esbuild: 'latest',
      h3: false,
    },
  })
}
