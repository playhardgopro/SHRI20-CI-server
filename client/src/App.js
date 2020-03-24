import React from 'react'
import { Footer, Header, Layout } from './components'

import './components/scss/Layout.scss'

function App() {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ hero: true, align: 'center' }} />
      <Footer />
    </div>
  )
}

export default App
