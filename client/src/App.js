import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings } from './components'

// import './components/scss/Layout.scss'

function App() {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/settings" component={Settings} />
        {/* <Route path="/schedule" component={Schedule} /> */}
      </Switch>
      {/* <Header className={{ distribute: 'between' }} />
      <Layout className={{ hero: true, align: 'center' }} />
      <Footer /> */}
    </div>
  )
}

export default App
