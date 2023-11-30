import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/test-utils',
		build: ['pnpm playwright-core install chromium', 'dev:prepare', 'prepack'],
		test: ['test:types', 'test:examples'],
	})
}