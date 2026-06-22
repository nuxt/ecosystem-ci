import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'npmx-dev/npmx.dev',
    build: [],
    test: ['build'],
  })
}
