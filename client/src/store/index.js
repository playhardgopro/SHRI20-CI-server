import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  // isLoading: false,
}

// сюда приходят actions и возвращают state в зависимости от switch
function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_SETTINGS':
      return { ...state, ...action.settings }
    case 'SERVER_RESPONSE':
      return { ...state, ...action.status }
    case 'IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'IS_CACHED':
      return { ...state, isCached: action.payload }
    default:
      return state
  }
}

function historyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_BUILD_LIST':
      return { buildList: [...action.list] }
    // case 'SERVER_RESPONSE':
    //   return { ...state, ...action.status }
    // case 'IS_LOADING':
    //   return { ...state, isLoading: action.payload }
    // case 'IS_CACHED':
    //   return { ...state, isCached: action.payload }
    default:
      return state
  }
}

function buildReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_BUILD_DETAILS':
      return { ...action.payload }
    default:
      return state
  }
}

const reducers = combineReducers({ settings: settingsReducer, history: historyReducer, build: buildReducer })
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
