import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getBuildList } from '../store/actionCreators'
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

const Details = ({ match, location, history, list, getBuildList, details }) => {
  const { buildNumber } = match.params
  useEffect(() => {}, [list])
  // FIXME: тут баг при перезагрузке страницы
  const options = list.filter((el) => el.buildNumber == buildNumber)
  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        {/* <Grid className={grid}> */}
        <div className="list">
          <div className="list__item">
            <Card
              options={options[0]}
              onClick={() => {
                history.push('/history')
              }}
            />
          </div>
        </div>

        <Log />
        {/* </Grid> */}
      </Layout>
      <Footer />
    </div>
  )
}
function mapStateToProps(state) {
  return {
    list: state.history.buildList,
    details: state.build,
  }
}

const mapDispatchToProps = {
  getBuildList,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details))
