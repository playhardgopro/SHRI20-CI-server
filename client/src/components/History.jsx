import React from 'react'
import { Form, Footer, Header, Layout, Grid } from '.'

// import './scss/Layout.scss'

const grid = {
  block: {
    'm-columns': '12',
    'col-gap': 'full',
    's-columns': '4',
  },
  elem: {
    'm-col': '4',
    'm-offset': '4',
  },
}

const History = () => {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        <Grid className={grid}>
          <Form />
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default History
