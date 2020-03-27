import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'

import App from './App'

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

function d() {
  store.dispatch({
    type: 'SET_TEST',
    name: 'test',
  })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {d()}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
