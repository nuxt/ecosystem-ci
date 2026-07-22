import type { RunOptions } from '../types.d.ts'
import { runInRepo } from '../utils.ts'

export function enabled(options: RunOptions) {
  return options.h3Ref != null
}

export async function build(options: RunOptions) {
  const ref = options.h3Ref
  if (!ref) {
    throw new Error('builds/h3 requires an --h3-ref')
  }
  const isCommit = /^[0-9a-f]{7,40}$/.test(ref)
  return runInRepo({
    ...options,
    repo: 'h3js/h3',
    branch: isCommit ? 'main' : ref,
    commit: isCommit ? ref : undefined,
    build: 'build',
  })
}

export const packages = {
  h3: '.',
}
