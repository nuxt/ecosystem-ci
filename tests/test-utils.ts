import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    overrides: {
      'nitropack': false,
      'h3': false,
      'nitro': false,
      'vitest-environment-nuxt': false,
    },
    repo: 'nuxt/test-utils',
    build: ['pnpm playwright-core install chromium', 'dev:prepare', 'prepack'],
    test: [
      // example-nitro-v3 is pinned to nuxt-nightly@5x and fails when ecosystem-ci
      // rewrites its `nuxt` dep to the local nuxt 4.x checkout. Skip until the
      // base nuxt version here is bumped to 5.x. See https://github.com/nuxt/test-utils/pull/1681.
      `pnpm --filter '!@nuxt/test-utils' --filter '!example-app-cucumber' --filter '!example-app-jest' --filter '!example-app-bun' --filter '!example-nitro-v3' -r test && pnpm --filter example-app-cucumber -r test`,
    ],
  })
}
