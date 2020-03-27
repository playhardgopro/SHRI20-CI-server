import { combineReducers, createStore } from 'redux'

const initialState = {
  name: 'foo',
  attrs: 'bar',
}

function test(state = initialState, action) {
  switch (action.type) {
    case 'SET_TEST':
      return { ...state, name: action.name }
    default:
      return state
  }
}

const reducers = combineReducers({ test })

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
