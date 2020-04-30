export const SAVE_SETTINGS = 'SAVE_SETTINGS'
export const SAVE_BUILD_LIST = 'SAVE_BUILD_LIST'
export const SAVE_BUILD_DETAILS = 'SAVE_BUILD_DETAILS'
export const SAVE_ERROR = 'SAVE_ERROR'
export const SAVE_LOGS = 'SAVE_LOGS'
export const IS_LOADING = 'IS_LOADING'
export const IS_CACHED = 'IS_CACHED'

interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS
  payload: BuildSettings
}

interface ToggleCachedAction {
  type: typeof IS_CACHED
  payload: boolean
}

interface ToggleLoadingAction {
  type: typeof IS_LOADING
  payload: boolean
}

export type SettingsActionTypes = SaveSettingsAction | ToggleCachedAction | ToggleLoadingAction

interface SaveBuildListAction {
  type: typeof SAVE_BUILD_LIST
  payload: BuildTask[]
}

export type BuildListActionTypes = SaveBuildListAction

interface SaveLogsActionTypes {
  type: typeof SAVE_LOGS
  payload: string
}

interface SaveBuildListDetailsAction {
  type: typeof SAVE_BUILD_DETAILS
  payload: BuildTask
}

export type BuildListDetailsActionTypes = SaveBuildListDetailsAction | SaveLogsActionTypes

interface SaveErrorsActionTypes {
  type: typeof SAVE_ERROR
  payload: string | number
}

export type ErrorActionTypes = SaveErrorsActionTypes
