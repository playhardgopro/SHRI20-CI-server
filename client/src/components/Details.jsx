import React from 'react'
import { Footer, Header, Layout, Grid, Card, Log } from '.'

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

const Details = ({ match, location, history }) => {
  const { buildNumber } = match.params
  console.log(buildNumber)
  return (
    <div className="layout layout_v-ratio_1-full-1">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's', 'indent-b': 20 }}>
        <Grid className={grid}>
          {/* <Card /> */}
          <Log />
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default Details
