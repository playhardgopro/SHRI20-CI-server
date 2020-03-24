import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Footer, Header, Layout } from '.'

import './scss/Layout.scss'

const Home = () => {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ hero: true, align: 'center' }} />
      <Footer />
    </div>
  )
}

export default Home
