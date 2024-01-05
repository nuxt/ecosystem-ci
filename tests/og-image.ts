import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt-modules/og-image',
		branch: 'main',
		build: ['pnpm playwright-core install chromium', 'build'],
		test: 'test',
	})
}
