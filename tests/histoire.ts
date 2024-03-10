import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'histoire-dev/histoire',
		build: ['build', 'pnpm --filter histoire-example-nuxt3 run story:build'],
		test: ['pnpm --filter histoire-example-nuxt3 run ci'],
		overrides: {
			rollup: 'latest',
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
