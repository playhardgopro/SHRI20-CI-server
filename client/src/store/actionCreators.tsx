import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

export const SAVE_SETTINGS = 'SAVE_SETTINGS'
export const SAVE_BUILD_LIST = 'SAVE_BUILD_LIST'
export const SAVE_BUILD_DETAILS = 'SAVE_BUILD_DETAILS'
export const SAVE_ERROR = 'SAVE_ERROR'
export const IS_LOADING = 'IS_LOADING'
export const IS_CACHED = 'IS_CACHED'

export function saveSettings(payload: BuildSettings) {
  const settings: BuildSettings = {
    repoName: payload.repoName,
    buildCommand: payload.buildCommand,
    mainBranch: payload.mainBranch,
    period: +payload.period,
  }
  return {
    type: SAVE_SETTINGS,
    settings,
  }
}

export function saveBuildList(list: BuildTask[]) {
  // console.log(list, 'build list')
  return {
    type: SAVE_BUILD_LIST,
    list,
  }
}

export function saveDetailsByBuildId(payload) {
  // console.log(payload, 'caching')
  return {
    type: SAVE_BUILD_DETAILS,
    payload,
  }
}

export function saveError(payload) {
  // console.log(payload, 'caching')
  return {
    type: SAVE_ERROR,
    payload,
  }
}

export function isLoading(payload: boolean) {
  // console.log(payload, 'loading')
  return {
    type: IS_LOADING,
    payload,
  }
}
export function isCached(payload: boolean) {
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
  return function (dispatch) {
    dispatch(isLoading(true))
    return axios
      .post('/api/settings', settings)
      .then((response) => {
        if (response.status === 200 && response.data.saveSettings === 'done') {
          dispatch(isLoading(false))
          // console.log(response.data)
          return { success: true }
        }
        dispatch(saveError({ postSettings: response.status }))
        return { success: false }
      })
      .catch((e) => {
        console.error(e)
        dispatch(isCached(false))
        return { success: false }
      })
  }
}

export const runBuild = (commitHash: string): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  return function (dispatch) {
    return (
      axios
        .post<BuildRequestResultModel>(`/api/builds/${commitHash}`)
        .then((response) => {
          if (response.status === 200) {
            return response.data
          }
          throw Error(`Can not run build with commit hash ${commitHash}`)
        })
        // .then((json) => dispatch(saveSettings(json.data)))
        .catch((e) => {
          console.error(e)
          // dispatch(isCached(false))
        })
    )
  }
}

export const getDetailsByBuildId = (buildId: string): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .get(`/api/builds/${buildId}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(saveDetailsByBuildId(response.data))
            // console.log(response.data, 'response details build')
          }
        })
        // .then((json) => dispatch(saveSettings(json.data)))
        .catch((e) => {
          console.error(e)
          // dispatch(isCached(false))
        })
    )
  }
}

export const getBuildList = (
  limit: number,
  offset?: number
): ThunkAction<Promise<any>, RootState, unknown, Action<string>> => {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .get<BuildTask[]>('/api/builds', { params: { limit, offset } })
        .then((response) => {
          if (response.status === 200) {
            dispatch(saveBuildList(response.data))
            // console.log(response.data, 'response')
            return { success: true }
          }
        })
        // .then((json) => dispatch(saveSettings(json.data)))
        .catch((e) => {
          console.error(e)
          return { success: false }
          // dispatch(isCached(false))
        })
    )
  }
}

export const getSettings = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    // dispatch(saveSettings(settings))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return axios
      .get<BuildSettings>('/api/settings')
      .then((json) => {
        if (json.status === 200) {
          dispatch(saveSettings(json.data))
          dispatch(isCached(true))
        } else {
          dispatch(isCached(false))
        }
      })
      .catch((e) => {
        console.error(e)
        dispatch(isCached(false))
      })
  }
}
