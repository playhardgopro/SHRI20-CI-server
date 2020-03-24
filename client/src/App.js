import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings } from './components'

// import './components/scss/Layout.scss'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/settings" component={Settings} />
    </Switch>
  )
}

export default App
