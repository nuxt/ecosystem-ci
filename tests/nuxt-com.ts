import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/nuxt.com',
		build: ['pnpm nuxi prepare'],
		test: ['test'],
	})
}
