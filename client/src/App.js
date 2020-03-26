import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings, History, Details } from './components'

function App({ history }) {
  return (
    <Switch>
      <Route history={history} exact path="/" component={Home} />
      <Route history={history} exact path="/settings" component={Settings} />
      {/* <Route history={history} exact path="/history" component={History} /> */}
      {/* <Route history={history} exact path="/details" component={Details} /> */}
    </Switch>
  )
}

export default App
