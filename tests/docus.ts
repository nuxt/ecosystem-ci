import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt-themes/docus',
		build: ['prepare'],
		test: ['generate'],
	})
}
