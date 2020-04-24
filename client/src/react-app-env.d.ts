/// <reference types="react-scripts" />
declare type ResponseSuccess = 'success'

declare interface BuildSettings {
  isCached?: boolean
  isLoading?: boolean
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
  status: BuildStatus
  start: string
  duration: number
}

declare interface BuildRequestResultModel {
  id: string
  buildNumber: number
  status: BuildStatus
}
declare enum BuildStatus {
  Waiting = 'Waiting',
  InProgress = 'InProgress',
  Success = 'Success',
  Fail = 'Fail',
  Canceled = 'Canceled',
}

declare interface RootState {
  settings: BuildSettings
  history: {
    buildList: BuildTask[]
  }
}
