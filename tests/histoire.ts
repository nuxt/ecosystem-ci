import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'histoire-dev/histoire',
		build: ['build', 'pnpm --filter histoire-example-nuxt3 story:build'],
		test: ['pnpm --filter histoire-example-nuxt3 ci'],
	})
}
