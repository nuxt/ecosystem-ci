import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/test-utils',
		build: ['dev:prepare', 'prepack'],
		test: [/* 'test:types', pending nuxt 3.9 */ 'test:examples'],
	})
}
