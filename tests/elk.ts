import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'elk-zone/elk',
		build: ['pnpm nuxi prepare'],
		test: ['test tests/unit', 'test:typecheck'],
	})
}
