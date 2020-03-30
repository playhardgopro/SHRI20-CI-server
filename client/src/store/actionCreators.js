import axios from 'axios'

export function saveSettings(payload) {
  console.log(payload, 'payload')
  const settings = {
    repoName: payload.repoName,
    buildCommand: payload.buildCommand,
    mainBranch: payload.mainBranch,
    period: +payload.period,
  }
  return {
    type: 'SAVE_SETTINGS',
    settings,
  }
}

export function saveBuildList(list) {
  console.log(list, 'build list')
  return {
    type: 'SAVE_BUILD_LIST',
    list,
  }
}

export function saveDetailsByBuildId(payload) {
  // console.log(payload, 'caching')
  return {
    type: 'SAVE_BUILD_DETAILS',
    payload,
  }
}

export function isLoading(payload) {
  console.log(payload, 'loading')
  return {
    type: 'IS_LOADING',
    payload,
  }
}
export function isCached(payload) {
  // console.log(payload, 'caching')
  return {
    type: 'IS_CACHED',
    payload,
  }
}

export function postSettings(settings) {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .post('http://localhost:3001/api/settings', settings)
        .then((response) => {
          if (response.status === 200 && response.data.saveSettings === 'done') {
            dispatch(isLoading(false))
            // console.log(response, 'response')
          }
        })
        // .then((json) => dispatch(saveSettings(json.data)))
        .catch((e) => {
          console.error(e)
          dispatch(isCached(false))
        })
    )
  }
}

export function runBuild(commitHash) {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .post(`http://localhost:3001/api/builds/${commitHash}`)
        .then((response) => {
          if (response.status === 200) {
            // dispatch(isLoading(false))

            console.log(response.data, 'response on run build')
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

// export function rebuildByCommitHash(commitHash) {
//   // console.log(settings, 'settings')
//   return function (dispatch) {
//     return (
//       axios
//         .get(`http://localhost:3001/api/builds/${buildId}`)
//         .then((response) => {
//           if (response.status === 200) {
//             dispatch(saveDetailsByBuildId(response.data))
//             console.log(response.data, 'response details build')
//           }
//         })
//         // .then((json) => dispatch(saveSettings(json.data)))
//         .catch((e) => {
//           console.error(e)
//           // dispatch(isCached(false))
//         })
//     )
//   }
// }

export function getDetailsByBuildId(buildId) {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .get(`http://localhost:3001/api/builds/${buildId}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(saveDetailsByBuildId(response.data))
            console.log(response.data, 'response details build')
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

export function getBuildList() {
  // console.log(settings, 'settings')
  return function (dispatch) {
    return (
      axios
        .get('http://localhost:3001/api/builds')
        .then((response) => {
          if (response.status === 200) {
            dispatch(saveBuildList(response.data))
            // console.log(response.data, 'response')
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

export function getSettings() {
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

    return (
      axios
        .get('http://localhost:3001/api/settings ')
        // .then(
        //   (response) => response.json(),
        //   // Do not use catch, because that will also catch
        //   // any errors in the dispatch and resulting render,
        //   // causing a loop of 'Unexpected batch number' errors.
        //   // https://github.com/facebook/react/issues/6895
        //   (error) => console.log('An error occurred.', error)
        // )
        .then((json) => dispatch(saveSettings(json.data)))
        .then(() => dispatch(isCached(true)))
        .catch((e) => {
          console.error(e)
          dispatch(isCached(false))
        })
    )
  }
}

// export { saveSettings, getSettings }
