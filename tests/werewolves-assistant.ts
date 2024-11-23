import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'antoinezanardi/werewolves-assistant-web-next',
    build: ['build'],
    test: [
      'test:unit',
    ],
  })
}
