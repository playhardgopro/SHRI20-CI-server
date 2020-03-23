import React from 'react'
import Counter from './features/counter/Counter'
import Button from './components/Button'
import Footer from './components/Footer'
import Header from './components/Header'
import Layout from './components/Layout'
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
