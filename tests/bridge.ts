import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/bridge',
		build: ['dev:prepare', 'build'],
		test: [
			'test:fixtures',
			'test:fixtures:dev',
			'test:fixtures:webpack',
			'test:fixtures:webpack:dev',
		],
		overrides: {
			nuxt: '^2.16.3',
			vue: '^2.7.14',
		},
	})
}
