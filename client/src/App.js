import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings } from './components'

// import './components/scss/Layout.scss'

function App() {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  )
}

export default App
