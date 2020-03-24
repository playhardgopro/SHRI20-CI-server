import React from 'react'
import Counter from './features/counter/Counter'
import { Footer, Header, Layout } from './components'

// import './scss/Layout.scss'

// import './App.css'

function App() {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout />
      <Footer />
    </div>
  )
}

export default App
