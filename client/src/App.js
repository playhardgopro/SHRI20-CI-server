import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { saveSettings, getSettings, getBuildList } from './store/actionCreators'
import { Home, Settings, History, Details } from './components'

const App = () => {
  const history = useHistory()
  const settings = useSelector((state) => state.settings)

  return (
    <Switch>
      <Route
        history={history}
        exact
        path="/"
        render={() => {
          return !settings.isCached ? <Redirect to="/history" /> : <Home />
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

const mapDispatchToProps = {
  saveSettings,
  getSettings,
  getBuildList,
}

export default connect(null, mapDispatchToProps)(App)
