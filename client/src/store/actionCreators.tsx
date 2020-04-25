import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import {
  SAVE_BUILD_DETAILS,
  SAVE_SETTINGS,
  SAVE_BUILD_LIST,
  SAVE_ERROR,
  SAVE_LOGS,
  IS_CACHED,
  IS_LOADING,
  SettingsActionTypes,
  BuildListDetailsActionTypes,
  BuildListActionTypes,
  ErrorActionTypes,
} from './types'

export function saveSettings(payload: BuildSettings): SettingsActionTypes {
  const settings: BuildSettings = {
    repoName: payload.repoName,
    buildCommand: payload.buildCommand,
    mainBranch: payload.mainBranch,
    period: +payload.period,
  }
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  }
}

export function saveBuildList(list: BuildTask[]): BuildListActionTypes {
  // console.log(list, 'build list')
  return {
    type: SAVE_BUILD_LIST,
    payload: list,
  }
}

export function saveDetailsByBuildId(payload: BuildTask): BuildListDetailsActionTypes {
  // console.log(payload, 'caching')
  return {
    type: SAVE_BUILD_DETAILS,
    payload,
  }
}

export function saveError(payload: string | number): ErrorActionTypes {
  // console.log(payload, 'caching')
  return {
    type: SAVE_ERROR,
    payload,
  }
}

export function saveLogs(payload: string): BuildListDetailsActionTypes {
  // console.log(payload, 'caching')
  return {
    type: SAVE_LOGS,
    payload,
  }
}

export function isLoading(payload: boolean): SettingsActionTypes {
  // console.log(payload, 'loading')
  return {
    type: IS_LOADING,
    payload,
  }
}
export function isCached(payload: boolean): SettingsActionTypes {
  // console.log(payload, 'caching')
  return {
    type: IS_CACHED,
    payload,
  }
}

export const postSettings = (payload: BuildSettings): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  // console.log(settings, 'settings')
  const settings = {
    repoName: payload.repoName,
    buildCommand: payload.buildCommand,
    mainBranch: payload.mainBranch,
    period: +payload.period,
  }
  return async function (dispatch) {
    dispatch(isLoading(true))
    try {
      const response = await axios.post('/api/settings', settings)
      if (response.status === 200 && response.data.saveSettings === 'done') {
        dispatch(isLoading(false))
        // console.log(response.data)
        return { success: true }
      }
      // dispatch(saveError({ postSettings: response.status }))
      return { success: false }
    } catch (e) {
      console.error(e)
      dispatch(isCached(false))
      return { success: false }
    }
  }
}

export const runBuild = (commitHash: string): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  return async function (dispatch) {
    try {
      const json = await axios.post<BuildRequestResultModel>(`/api/builds/${commitHash}`)
      if (json.status === 200) {
        return json.data
      }
      throw Error(`Can not run build with commit hash ${commitHash}`)
    } catch (e) {
      console.error(e)
    }
  }
}

export const getDetailsByBuildId = (buildId: string): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  // console.log(settings, 'settings')
  return async function (dispatch) {
    try {
      const json = await axios.get(`/api/builds/${buildId}`)
      if (json.status === 200) {
        dispatch(saveDetailsByBuildId(json.data))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getBuildList = (
  limit: number,
  offset?: number
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  // console.log(settings, 'settings')
  return async function (dispatch) {
    try {
      const json = await axios.get<BuildTask[]>('/api/builds', { params: { limit, offset } })
      if (json.status === 200) {
        dispatch(saveBuildList(json.data))
        return { success: true }
      }
    } catch (e) {
      console.error(e)
      return { success: false }
    }
  }
}

export const getLogs = (buildId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async function (dispatch) {
    try {
      const plainText = await axios.get<string>(`/api/builds/${buildId}/logs`)
      if (plainText.status === 200) {
        console.log(plainText.data)
        dispatch(saveLogs(plainText.data))
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getSettings = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async function (dispatch) {
    try {
      const json = await axios.get<BuildSettings>('/api/settings')
      if (json.status === 200) {
        dispatch(saveSettings(json.data))
        dispatch(isCached(true))
      } else {
        dispatch(isCached(false))
      }
    } catch (e) {
      console.error(e)
      dispatch(isCached(false))
    }
  }
}
