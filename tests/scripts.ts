import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.js'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/scripts',
		beforeTest: 'pnpm playwright-core install chromium',
		build: ['dev:prepare'],
		test: ['test', 'build', 'typecheck'],
		overrides: {
			esbuild: 'latest',
		},
	})
}
