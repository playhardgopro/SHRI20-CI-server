import * as React from 'react'
import { connect, useSelector } from 'react-redux'
import { getBuildList } from '../../../store/actionCreators'
import { List, Footer, Header, Layout, Grid } from '../../index'

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
  // const buildList = useSelector((state) => state.history.buildList)
  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        <Grid className={grid}>
          <List />
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default connect(null, { getBuildList })(History)
