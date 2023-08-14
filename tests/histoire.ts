import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'histoire-dev/histoire',
		build: ['build', 'pnpm --filter histoire-example-nuxt3 story:build'],
		test: ['pnpm --filter histoire-example-nuxt3 ci'],
		overrides: {
			vue: false,
			'@vue/compiler-sfc': false,
			'@vue/compiler-ssr': false,
			'@vue/runtime-dom': false,
			'@vue/server-renderer': false,
			'@vue/compiler-core': false,
			'@vue/reactivity': false,
			'@vue/shared': false,
			'@vue/compiler-dom': false,
			'@vue/reactivity-transform': false,
			'@vue/runtime-core': false,
		},
	})
}
