import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings, History, Details } from './components'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/history" component={History} />
      <Route exact path="/details" component={Details} />
    </Switch>
  )
}

export default App
