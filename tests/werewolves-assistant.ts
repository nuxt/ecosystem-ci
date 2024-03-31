import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'antoinezanardi/werewolves-assistant-web',
		build: ['build'],
		test: [
			'lint:fix',
			'test:unit',
			'docker:sandbox-api:start',
			'test:cucumber:prepare',
			'test:cucumber',
		],
	})
}
