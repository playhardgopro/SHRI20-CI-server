import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
