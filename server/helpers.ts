import { promisify } from 'util'
import { mkdir } from 'fs'
import axios from 'axios'
import type { AxiosError } from 'axios'
import { exec } from 'child_process'

const execAsync = promisify(exec)
const mkdirAsync = promisify(mkdir)
const sleep = promisify(setTimeout)

export function errorHandler(error: AxiosError<any>): void {
  if (error.response) {
    console.warn(error.response.status)
    console.log(error.response.data.title)
    console.error(error.response.data.errors)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
}

export async function clear(settings: BuildSettings): Promise<BuildSettings> {
  const [userName, repo] = settings.repoName.split('/')
  console.log(`clearing ${userName}/${repo}`)
  await execAsync(`rm -rf ./localStorage/${userName}`)
  console.log('done')
  return settings
}

export async function gitClone(settings: BuildSettings): Promise<BuildSettings> {
  const [userName, repo] = settings.repoName.split('/')

  try {
    await mkdirAsync(`./localStorage/${userName}`, { recursive: true })
    console.log(`downloading repository from https://github.com/${userName}/${repo}.git`)
    await execAsync(`git clone https://github.com/${userName}/${repo}.git`, {
      cwd: `./localStorage/${userName}`,
    })
    await console.log('done')
  } catch (e) {
    console.log(e.code, 'gitClone')
  }
  return settings
}

export async function getCommitInfo(commitHash: string, settings: BuildSettings): Promise<CommitInfo> {
  const [userName, repo] = settings.repoName.split('/')
  const branch = await execAsync(`git branch --contains ${commitHash}`, {
    cwd: `./localStorage/${userName}/${repo}`,
  })
  const commitInfo = await execAsync(`git show ${commitHash} --pretty=format:"%an|%s" --no-patch`, {
    cwd: `./localStorage/${userName}/${repo}`,
  })
  const branchName = branch.stdout.replace('*', '').trim()
  const [authorName, commitMessage] = commitInfo.stdout.split('|')
  console.log('commit hash   ', commitHash)
  console.log('commit branch ', branchName)
  console.log('commit author ', authorName)
  console.log('commit message', commitMessage)
  return {
    branchName,
    authorName,
    commitHash,
    commitMessage,
  }
}

export async function getCommitHash(settings: BuildSettings) {
  const [userName, repo] = settings.repoName.split('/')
  const commitHash = await execAsync('git rev-parse HEAD', {
    cwd: `./localStorage/${userName}/${repo}`,
  })
  return commitHash.stdout.trim()
}

export type buildObjectStart = {}

export async function buildStart(buildObject: BuildTask) {
  const { id } = buildObject
  const startBuild = { buildId: id, dateTime: new Date() }
  axios.post('/build/start', startBuild).catch((e) => errorHandler(e))
  return buildObject
}

export async function buildCancel(buildObject: BuildTask) {
  const buildId = buildObject.id
  axios.post('/build/cancel', buildId).catch((e) => errorHandler(e))

  return buildObject
}

export async function buildFinish(buildObject: BuildTask) {
  const randomDuration = Math.round(Math.random() * 10000)
  console.log('Starting build for', buildObject.id)

  const finishLog = {
    buildId: buildObject.id,
    duration: randomDuration,
    success: !!Math.round(Math.random()),
    buildLog:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }
  // console.log(finishLog);
  await sleep(randomDuration)
  console.log('Build has been finished with status', finishLog.success)
  await axios
    .post('/build/finish', finishLog)
    .then(() => console.log('Build logs have been posted'))
    .catch((e) => errorHandler(e))
  return buildObject
}
