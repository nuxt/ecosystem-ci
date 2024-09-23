import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'nuxt-modules/storybook',
    build: ['dev:prepare', 'build', 'dev:build', 'example:showcase:build'],
    test: ['test'],
  })
}
