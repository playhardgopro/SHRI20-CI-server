import { combineReducers, createStore } from 'redux'

const initialState = {
  // repoName: 'username',
  // buildCommand: 'build',
  // mainBranch: 'm',
  // period: 10,
}

// сюда приходят actions и возвращают state в зависимости от switch
function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_SETTINGS':
      return action.payload
    default:
      return state
  }
}

const reducers = combineReducers({ settings: settingsReducer })

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
