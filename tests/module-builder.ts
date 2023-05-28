import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/module-builder',
		build: ['pnpm -r dev:prepare'],
		test: ['test'],
	})
}
