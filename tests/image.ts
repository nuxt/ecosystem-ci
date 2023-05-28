import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/image',
		build: ['dev:prepare', 'build'],
		test: ['test', 'test:types'],
	})
}
