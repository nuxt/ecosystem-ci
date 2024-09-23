import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'antoinezanardi/werewolves-assistant-web-next',
    build: ['build'],
    test: [
      'test:unit',
      'docker:sandbox-api:start',
      'test:cucumber:prepare',
      'test:cucumber:shard-1:skip-screenshots-comparison',
      'test:cucumber:shard-2:skip-screenshots-comparison',
      'test:cucumber:shard-3:skip-screenshots-comparison',
      'test:cucumber:shard-4:skip-screenshots-comparison',
    ],
  })
}
