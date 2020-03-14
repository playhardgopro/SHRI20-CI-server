const util = require('util');
const fs = require('fs');
const axios = require('axios');

const exec = util.promisify(require('child_process').exec);
const spawn = util.promisify(require('child_process').spawn);

async function clear(settings) {
  const [userName, repo] = settings.repoName.split('/');
  const { stdout, stderr } = await exec(`rm -rf ./localStorage/${userName}`);
  console.log('clear', userName, '/', repo, stdout);
  return settings;
}

async function gitClone(settings) {
  const [userName, repo] = settings.repoName.split('/');
  fs.mkdirSync(`./localStorage/${userName}`, { recursive: true });
  const { stdout, stderr } = await exec(
    `git clone https://github.com/${userName}/${repo}.git`,
    {
      cwd: `./localStorage/${userName}`
    }
  );
  console.log(stdout ? `git clone stdout ${stdout}` : '');
  // console.log('stderr:', stderr);
  return settings;
}

async function getCommitHash(settings) {
  const [userName, repo] = settings.repoName.split('/');

  const { stdout, stderr } = await exec('git rev-parse HEAD', {
    cwd: `./localStorage/${userName}/${repo}`
  });
  console.log('get commit stdout:', stdout);
  // console.log('stderr:', stderr);
  const commitHash = stdout;
  return commitHash;
}

async function getCommitInfo(commitHash, settings) {
  const [userName, repo] = settings.repoName.split('/');
  const branch = await exec(`git branch --contains ${commitHash}`, {
    cwd: `./localStorage/${userName}/${repo}`
  });
  const commitInfo = await exec(
    `git show ${commitHash} --pretty=format:"%an|%s" --no-patch`,
    {
      cwd: `./localStorage/${userName}/${repo}`
    }
  );
  const branchName = branch.stdout.replace('* ', '');
  const [authorName, commitMessage] = commitInfo.stdout.split('|');
  console.log('get commit branch ', branchName);
  console.log('get commit author ', authorName);
  console.log('get commit message', commitMessage);
  console.log('get commit hash   ', commitHash);
  return {
    branchName,
    authorName,
    commitHash,
    commitMessage
  };
}

module.exports = {
  getCommitHash,
  gitClone,
  clear,
  getCommitInfo
};
