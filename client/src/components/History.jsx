import React from 'react'
import { List, Footer, Header, Layout, Grid, Card } from '.'

// import './scss/Layout.scss'

const grid = {
  block: {
    'm-columns': '12',
    'col-gap': 'full',
  },
  elem: {
    'm-col': '12',
  },
}

const History = () => {
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        <Grid className={grid}>
          <List>
            <Card />
          </List>
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default History
