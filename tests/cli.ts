import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/cli',
		build: ['build'],
		test: ['test:dist'],
	})
}
