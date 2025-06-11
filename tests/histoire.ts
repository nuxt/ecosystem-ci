import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'histoire-dev/histoire',
    build: ['build', 'pnpm --filter histoire-example-nuxt3 run story:build'],
    test: ['pnpm --filter histoire-example-nuxt3 run ci'],
    overrides: {
      'rollup': 'latest',
      '@nuxtjs/tailwindcss': '^6.0.0',
      'jiti': 'latest',
    },
  })
}
