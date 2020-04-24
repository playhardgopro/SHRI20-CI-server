import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Settings, History, Details } from './components/index'

const App = () => {
  const history = useHistory()
  const settings: BuildSettings = useSelector((state) => state.settings)

  return (
    <Switch>
      <Route
        history={history}
        exact
        path="/"
        render={() => {
          return settings.isCached ? <Redirect to="/history" /> : <Home />
        }}
      />
      <Route history={history} exact path="/settings">
        <Settings />
      </Route>
      <Route history={history} exact path="/history">
        <History />
      </Route>
      <Route history={history} exact path="/build/:buildNumber">
        <Details />
      </Route>
    </Switch>
  )
}

export default App
