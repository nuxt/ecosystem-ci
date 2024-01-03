import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/image',
		beforeTest: 'pnpm playwright-core install chromium',
		build: ['dev:prepare', 'build'],
		test: ['test', 'test:types'],
	})
}
