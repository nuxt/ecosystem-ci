import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    overrides: {
      nitropack: false,
      h3: false,
      nitro: false,
    },
    repo: 'nuxt/test-utils',
    build: ['pnpm playwright-core install chromium', 'dev:prepare', 'prepack'],
    test: ['test:examples'],
  })
}
