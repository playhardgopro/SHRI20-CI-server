const util = require('util')
const fs = require('fs')
const axios = require('axios')

const exec = util.promisify(require('child_process').exec)

const sleep = util.promisify(setTimeout)

function errorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn(error.response.status)
    console.log(error.response.data.title)
    console.error(error.response.data.errors)

    // console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  // console.log(error.config)
}

async function clear(settings) {
  const [userName, repo] = settings.repoName.split('/')
  console.log(`clearing ${userName}/${repo}`)
  await exec(`rm -rf ./localStorage/${userName}`)
  await console.log('done')
  return settings
}

async function gitClone(settings) {
  const [userName, repo] = settings.repoName.split('/')
  fs.mkdirSync(`./localStorage/${userName}`, { recursive: true })

  try {
    console.log(`downloading repository from https://github.com/${userName}/${repo}.git`)
    await exec(`git clone https://github.com/${userName}/${repo}.git`, {
      cwd: `./localStorage/${userName}`,
    })
    await console.log('done')
  } catch (e) {
    console.log(e.code, 'gitClone')
  }
  return settings
}

async function getCommitInfo(commitHash, settings) {
  const [userName, repo] = settings.repoName.split('/')
  const branch = await exec(`git branch --contains ${commitHash}`, {
    cwd: `./localStorage/${userName}/${repo}`,
  })
  const commitInfo = await exec(`git show ${commitHash} --pretty=format:"%an|%s" --no-patch`, {
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

async function getCommitHash(settings) {
  const [userName, repo] = settings.repoName.split('/')
  const commitHash = await exec('git rev-parse HEAD', {
    cwd: `./localStorage/${userName}/${repo}`,
  })
  return commitHash.stdout.trim()
}

async function buildStart(buildObject) {
  const { id } = buildObject
  const startBuild = { buildId: id, dateTime: new Date() }
  axios.post('/build/start', startBuild).catch((e) => errorHandler(e))
  return buildObject
}

async function buildCancel(buildObject) {
  const buildId = buildObject.id
  axios.post('/build/cancel', buildId).catch((e) => errorHandler(e))

  return buildObject
}

async function buildFinish(buildObject) {
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
  await console.log('Build has been finished with status', finishLog.success)
  await axios
    .post('/build/finish', finishLog)
    .then(() => console.log('Build logs have been posted'))
    .catch((e) => errorHandler(e))
  return buildObject
}

module.exports = {
  gitClone,
  clear,
  getCommitInfo,
  buildStart,
  buildCancel,
  buildFinish,
  getCommitHash,
  errorHandler,
}
