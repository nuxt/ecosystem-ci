import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.ts'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'antoinezanardi/werewolves-assistant-web-next',
		build: ['build'],
		test: [
			'test:unit',
			'docker:sandbox-api:start',
			'test:cucumber:prepare',
			'test:cucumber:skip-screenshots-comparison',
		],
	})
}
