import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'elk-zone/elk',
    build: ['pnpm nuxi prepare'],
    test: ['test', 'test:typecheck'],
  })
}
