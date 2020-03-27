import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import App from './App'

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
