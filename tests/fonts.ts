import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.js'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/fonts',
		build: ['dev:prepare'],
		test: ['test'],
		overrides: {
			esbuild: 'latest',
		},
	})
}
