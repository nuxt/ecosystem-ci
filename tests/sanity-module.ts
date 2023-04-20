import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt-modules/sanity',
		build: ['dev:prepare', 'build'],
		test: ['test'],
	})
}
