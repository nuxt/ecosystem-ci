// eslint-disable-next-line node/no-unpublished-import
import type { AGENTS } from '@antfu/ni'

export interface EnvironmentData {
  root: string
  workspace: string
  nuxtPath: string
  cwd: string
  env: ProcessEnv
}

export interface RunOptions {
  workspace: string
  root: string
  nuxtPath: string
  nuxtMajor: number
  verify?: boolean
  skipGit?: boolean
  release?: string
  nightly?: string
  agent?: (typeof AGENTS)[number]
  build?: Task | Task[]
  test?: Task | Task[]
  beforeInstall?: Task | Task[]
  beforeBuild?: Task | Task[]
  beforeTest?: Task | Task[]
}

type Task = string | { script: string, args?: string[] } | (() => Promise<any>)

export interface CommandOptions {
  suites?: string[]
  repo?: string
  branch?: string
  tag?: string
  commit?: string
  release?: string
  verify?: boolean
  skipGit?: boolean
  nightly?: string
}

export interface RepoOptions {
  repo: string
  dir?: string
  branch?: string
  tag?: string
  commit?: string
  shallow?: boolean
  overrides?: Overrides
}

export interface Overrides {
  [key: string]: string | boolean
}

export interface ProcessEnv {
  [key: string]: string | undefined
}
