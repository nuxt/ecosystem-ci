import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/content',
		build: ['prepare', 'build'],
		test: ['test'],
	})
}
