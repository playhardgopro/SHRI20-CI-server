import * as React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Settings, History, Details } from './components/index'

export interface RootState {
  settings: BuildSettings
  history: {
    buildList: BuildTask[]
  }
}

const App = () => {
  const history = useHistory()
  const settings: BuildSettings = useSelector((state: RootState) => state.settings)

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
