import * as React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Settings, History, Details } from './components/index'

// import en from './locale/en.json'

const App = () => {
  const history = useHistory()
  const currentLocale = useSelector((state: RootState) => state.locale)
  const settings: BuildSettings = useSelector((state: RootState) => state.settings)

  if (process.env.NODE_ENV === 'development') {
    window.locale = require(`./locales/${currentLocale}.json`)
  }

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
