import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export function enabled(options: RunOptions) {
  return options.nitroRef != null
}

export async function build(options: RunOptions) {
  const ref = options.nitroRef
  if (!ref) {
    throw new Error('builds/nitro requires a --nitro-ref')
  }
  const isCommit = /^[0-9a-f]{7,40}$/.test(ref)
  return runInRepo({
    ...options,
    repo: 'nitrojs/nitro',
    branch: isCommit ? 'main' : ref,
    commit: isCommit ? ref : undefined,
    build: 'build',
  })
}

// `main` publishes `nitro` (v3), the `v2` branch publishes `nitropack`;
// both are single-package repos so each maps to the repo root.
export const packages = {
  nitro: '.',
  nitropack: '.',
}
