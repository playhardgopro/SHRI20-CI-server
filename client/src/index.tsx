import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { getSettings, getBuildList } from './store/actionCreators'
import store from './store'

import App from './App'

store.dispatch(getSettings())
store.dispatch(getBuildList(25))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
