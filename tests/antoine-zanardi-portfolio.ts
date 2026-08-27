import type { RunOptions } from '../types.ts'
import { runInRepo } from '../utils.ts'

export async function test(options: RunOptions) {
  await runInRepo({
    ...options,
    repo: 'antoinezanardi/antoinezanardi.fr',
    branch: 'master',
    overrides: {
      '@nuxt/image': 'latest',
    },
    build: ['build'],
    test: [
      'test:unit:cov',
      'test:cucumber:prepare',
      'test:cucumber',
    ],
  })
}
