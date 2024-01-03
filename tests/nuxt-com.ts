import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/nuxt.com',
		build: ['pnpm nuxi prepare'],
		test: ['test'],
	})
}
