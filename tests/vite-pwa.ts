import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vite-pwa/nuxt',
		branch: 'main',
		beforeTest: 'pnpm playwright install chromium',
		build: ['dev:prepare', 'prepack'],
		test: 'test',
	})
}
