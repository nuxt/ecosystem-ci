import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vite-pwa/nuxt',
		branch: 'main',
		beforeTest: 'pnpm playwright install',
		build: ['dev:prepare', 'prepack'],
		test: 'test',
	})
}
