/// <reference types="react-scripts" />
declare type ResponseSuccess = 'success'

declare interface BuildSettings {
  isCached?: boolean
  repoName: string
  buildCommand: string
  mainBranch: string
  period: number
}

declare interface CommitInfo {
  branchName: string
  authorName: string
  commitHash: string
  commitMessage: string
}

declare interface BuildTask {
  id: string
  configurationId: string
  buildNumber: number
  commitMessage: string
  commitHash: string
  branchName: string
  authorName: string
  status: string
  start: string
  duration: number
}
