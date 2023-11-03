import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/starter',
		branch: 'v3',
		build: 'build',
		test: [],
	})
}
