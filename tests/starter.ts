import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/starter',
		branch: 'v3',
		build: 'build',
		test: [],
	})
}
