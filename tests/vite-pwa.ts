import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vite-pwa/nuxt',
		branch: 'userquin/nuxt-ecosystem-ci-vite-5',
		beforeTest: 'pnpm playwright install chromium',
		build: ['dev:prepare', 'prepack'],
		test: 'test',
	})
}
