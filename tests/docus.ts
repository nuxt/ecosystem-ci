import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt-themes/docus',
		build: ['prepare'],
		test: ['generate'],
	})
}
