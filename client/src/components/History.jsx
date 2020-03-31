import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getBuildList } from '../store/actionCreators'
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

const History = ({ getBuildList, list }) => {
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

function mapStateToProps(state) {
  return {
    historyPage: state.history,
    list: state.history.buildList,
  }
}

const mapDispatchToProps = {
  getBuildList,
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
