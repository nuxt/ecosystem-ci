import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		branch: 'v2',
		repo: 'vuejs/pinia',
		build: ['pnpm run -r dev:prepare', 'build'],
		test: ['pnpm vitest packages/nuxt'],
	})
}
