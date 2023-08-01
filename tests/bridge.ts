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
			nuxt: '^2.17.1',
			vue: '^2.7.14',
			'@vue/compiler-sfc': '^2.7.14',
			'@nuxt/webpack-builder': false,
			'@nuxt/vite-builder': false,
		},
	})
}
