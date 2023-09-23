import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/image',
		beforeTest: 'pnpm playwright install chromium',
		build: ['dev:prepare', 'build'],
		test: ['test', 'test:types'],
	})
}
