import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		branch: 'dev',
		repo: 'nuxt/ui',
		build: ['dev:prepare'],
		test: ['typecheck', 'build', 'build:docs'],
	})
}
