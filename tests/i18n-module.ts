import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		shallow: false,
		branch: 'next',
		beforeTest: 'pnpm playwright install chromium',
		repo: 'nuxt-modules/i18n',
		build: ['build'],
		test: ['test'],
	})
}
