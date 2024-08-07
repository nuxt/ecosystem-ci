import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		shallow: false,
		beforeTest: 'pnpm playwright-core install chromium',
		repo: 'nuxt-modules/i18n',
		build: ['build'],
		test: ['test'],
	})
}
