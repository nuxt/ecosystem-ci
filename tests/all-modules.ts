import { ofetch } from 'ofetch'
import { runInRepo } from '../utils.ts'
import type { RunOptions } from '../types.d.ts'

type NuxtAPI = {
	version: string
	generatedAt: string
	stats: {
		downloads: number
		stars: number
		maintainers: number
		contributors: number
		modules: number
	}
	modules: Array<{
		name: string
		description: string
		repo: string
		npm: string
		icon: string
		github: string
		website: string
		learn_more: string
		category: string
		type: string
		maintainers: Array<{
			name: string
			github: string
			avatar?: string
			twitter?: string
		}>
		compatibility: {
			nuxt: string
			requires: {
				bridge: any
				content?: boolean
			}
			devtools?: string
		}
		stats: {
			downloads: number
			stars: number
			watchers: number
			forks: number
			defaultBranch: string
			publishedAt: number
			createdAt: number
		}
		contributors: Array<{
			id: number
			username: string
			contributions: number
		}>
	}>
}

const failedModules: [string, unknown][] = []

export async function test(options: RunOptions) {
	const { modules } = await ofetch<NuxtAPI>('https://api.nuxt.com/modules')

	await Promise.all(
		modules.map((module) =>
			runInRepo({
				...options,
				repo: module.repo,
				build: ['build'],
			}).catch((err) => failedModules.push([module.name, err?.message || err])),
		),
	)

	if (failedModules.length > 0) {
		throw new Error(JSON.stringify(failedModules))
	}
}
