import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { getSettings, getBuildList } from './store/actionCreators'
import { SAVE_LOCALE } from './store/types'
import store from './store'
import * as ServiceWorker from './serviceWorker'

import App from './App'

const [locale, country] = navigator.language.split('-') || ['en', 'US']
console.info('User locale:', locale)
store.dispatch({ type: SAVE_LOCALE, payload: locale })

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

ServiceWorker.register()
