import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/example-layers-monorepo',
		build: ['prepare'],
		test: ['pnpm run -r typecheck'],
	})
}
