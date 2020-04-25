import { combineReducers, createStore, applyMiddleware, compose, Action } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import {
  SAVE_SETTINGS,
  IS_LOADING,
  IS_CACHED,
  SAVE_BUILD_LIST,
  SAVE_BUILD_DETAILS,
  SAVE_ERROR,
  SAVE_LOGS,
  SettingsActionTypes,
  BuildListActionTypes,
  BuildListDetailsActionTypes,
  ErrorActionTypes,
} from './types'

const initialState = {
  // isLoading: false,
}

// сюда приходят actions и возвращают state в зависимости от switch
function settingsReducer(state = initialState, action: SettingsActionTypes) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return { ...state, ...action.payload }
    case IS_LOADING:
      return { ...state, isLoading: action.payload }
    case IS_CACHED:
      return { ...state, isCached: action.payload }
    default:
      return state
  }
}

function historyReducer(state = initialState, action: BuildListActionTypes) {
  switch (action.type) {
    case SAVE_BUILD_LIST:
      return { buildList: [...action.payload] }
    default:
      return state
  }
}

function buildReducer(state = initialState, action: BuildListDetailsActionTypes) {
  switch (action.type) {
    case SAVE_BUILD_DETAILS:
      return { ...action.payload }
    case SAVE_LOGS:
      return { logs: action.payload }
    default:
      return state
  }
}

function errorsReducer(state = initialState, action: ErrorActionTypes) {
  switch (action.type) {
    case SAVE_ERROR:
      return action.payload
    default:
      return state
  }
}

const reducers = combineReducers({
  settings: settingsReducer,
  history: historyReducer,
  build: buildReducer,
  errors: errorsReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState, Action>)))

export default store
