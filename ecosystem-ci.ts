import type { CommandOptions, RunOptions } from './types.d.ts'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { cac } from 'cac'
import {
  bisectNuxt,
  buildNuxt,
  getNuxtNightlyVersion,
  parseMajorVersion,
  parseNuxtMajor,
  setupEnvironment,
  setupNuxtRepo,
} from './utils.ts'

const cli = cac()
cli
  .command('[...suites]', 'build nuxt and run selected suites')
  .option('--verify', 'verify checkouts by running tests', { default: false })
  .option('--repo <repo>', 'nuxt repository to use', { default: 'nuxt/nuxt' })
  .option('--branch <branch>', 'nuxt branch to use', { default: 'main' })
  .option('--tag <tag>', 'nuxt tag to use')
  .option('--commit <commit>', 'nuxt commit sha to use')
  .option('--release <version>', 'nuxt release to use from npm registry')
  .action(async (suites, options: CommandOptions) => {
    const { root, nuxtPath, workspace } = await setupEnvironment()
    const suitesToRun = getSuitesToRun(suites, root)
    let nuxtMajor
    if (!options.release) {
      await setupNuxtRepo(options)
      const nightly = await getNuxtNightlyVersion()
      if (!nightly || options.repo === 'nuxt/nuxt') {
        await buildNuxt({ verify: options.verify })
      }
      else {
        options.nightly = nightly
      }
      nuxtMajor = parseNuxtMajor(nuxtPath)
    }
    else {
      nuxtMajor = parseMajorVersion(options.release)
    }
    const runOptions: RunOptions = {
      root,
      nuxtPath,
      nuxtMajor,
      workspace,
      release: options.release,
      nightly: options.nightly,
      verify: options.verify,
      skipGit: false,
    }
    for (const suite of suitesToRun) {
      await run(suite, runOptions)
    }
  })

cli
  .command('build-nuxt', 'build nuxt only')
  .option('--verify', 'verify nuxt checkout by running tests', {
    default: false,
  })
  .option('--repo <repo>', 'nuxt repository to use', { default: 'nuxt/nuxt' })
  .option('--branch <branch>', 'nuxt branch to use', { default: 'main' })
  .option('--tag <tag>', 'nuxt tag to use')
  .option('--commit <commit>', 'nuxt commit sha to use')
  .action(async (options: CommandOptions) => {
    await setupEnvironment()
    await setupNuxtRepo(options)
    await buildNuxt({ verify: options.verify })
  })

cli
  .command('run-suites [...suites]', 'run single suite with pre-built nuxt')
  .option(
    '--verify',
    'verify checkout by running tests before using local nuxt',
    { default: false },
  )
  .option('--repo <repo>', 'nuxt repository to use', { default: 'nuxt/nuxt' })
  .option('--release <version>', 'nuxt release to use from npm registry')
  .action(async (suites, options: CommandOptions) => {
    const { root, nuxtPath, workspace } = await setupEnvironment()
    const suitesToRun = getSuitesToRun(suites, root)
    const runOptions: RunOptions = {
      ...options,
      root,
      nuxtPath,
      nuxtMajor: parseNuxtMajor(nuxtPath),
      workspace,
    }
    for (const suite of suitesToRun) {
      await run(suite, runOptions)
    }
  })

cli
  .command(
    'bisect [...suites]',
    'use git bisect to find a commit in nuxt that broke suites',
  )
  .option('--good <ref>', 'last known good ref, e.g. a previous tag. REQUIRED!')
  .option('--verify', 'verify checkouts by running tests', { default: false })
  .option('--repo <repo>', 'nuxt repository to use', { default: 'nuxt/nuxt' })
  .option('--branch <branch>', 'nuxt branch to use', { default: 'main' })
  .option('--tag <tag>', 'nuxt tag to use')
  .option('--commit <commit>', 'nuxt commit sha to use')
  .action(async (suites, options: CommandOptions & { good: string }) => {
    if (!options.good) {
      console.log(
        'you have to specify a known good version with `--good <commit|tag>`',
      )
      process.exit(1)
    }
    const { root, nuxtPath, workspace } = await setupEnvironment()
    const suitesToRun = getSuitesToRun(suites, root)
    let isFirstRun = true
    const { verify } = options
    const runSuite = async () => {
      try {
        const nightly = await getNuxtNightlyVersion()
        if (!nightly) {
          await buildNuxt({ verify: isFirstRun && verify })
        }
        else {
          options.nightly = nightly
        }
        for (const suite of suitesToRun) {
          await run(suite, {
            verify: !!(isFirstRun && verify),
            skipGit: !isFirstRun,
            root,
            nuxtPath,
            nuxtMajor: parseNuxtMajor(nuxtPath),
            workspace,
          })
        }
        isFirstRun = false
        return null
      }
      catch (e) {
        return e
      }
    }
    await setupNuxtRepo({ ...options, shallow: false })
    const initialError = await runSuite()
    if (initialError) {
      await bisectNuxt(options.good, runSuite)
    }
    else {
      console.log(`no errors for starting commit, cannot bisect`)
    }
  })
cli.help()
cli.parse()

async function run(suite: string, options: RunOptions) {
  const { test } = await import(`./tests/${suite}.ts`)
  await test({
    ...options,
    workspace: path.resolve(options.workspace, suite),
  })
}

function getSuitesToRun(suites: string[], root: string) {
  let suitesToRun: string[] = suites
  const availableSuites: string[] = fs
    .readdirSync(path.join(root, 'tests'))
    .filter((f: string) => !f.startsWith('_') && f.endsWith('.ts'))
    .map((f: string) => f.slice(0, -3))
  availableSuites.sort()
  if (suitesToRun.length === 0) {
    suitesToRun = availableSuites
  }
  else {
    const invalidSuites = suitesToRun.filter(
      x => !x.startsWith('_') && !availableSuites.includes(x),
    )
    if (invalidSuites.length) {
      console.log(`invalid suite(s): ${invalidSuites.join(', ')}`)
      console.log(`available suites: ${availableSuites.join(', ')}`)
      process.exit(1)
    }
  }
  return suitesToRun
}
