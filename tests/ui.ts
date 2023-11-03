import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		branch: 'dev',
		repo: 'nuxt/ui',
		build: ['dev:prepare'],
		test: ['typecheck', 'build', 'build:docs'],
	})
}
