import * as React from 'react'
import { Footer, Header, Layout, RepConnection, Grid } from '../../index'

const grid = {
  block: {
    'm-columns': '12',
    'col-gap': 'full',
  },
  elem: {
    'm-col': '4',
    'm-offset': '4',
  },
}

const Home = () => {
  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ hero: true, align: 'center' }}>
        <Grid className={grid}>
          <RepConnection />
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default Home
