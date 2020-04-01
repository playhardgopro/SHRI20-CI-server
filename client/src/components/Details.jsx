import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getBuildList, saveDetailsByBuildId } from '../store/actionCreators'
import { Footer, Header, Layout, Card, Log } from '.'

// import './scss/Layout.scss'

// const grid = {
//   block: {
//     'm-columns': '12',
//     'col-gap': 'full',
//   },
//   elem: {
//     'm-col': '12',
//   },
// }

const Details = ({ match, history, buildList, getBuildList }) => {
  const { buildNumber } = match.params
  useEffect(() => {
    getBuildList()
  }, [buildNumber])

  // NOTE: здесь захардкожено, надо подумать, как сделать лучше
  const options = buildList ? buildList.filter((el) => el.buildNumber == buildNumber) : []
  const filteredOptions = options.length ? options : null

  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        {/* <Grid className={grid}> */}
        <div className="list">
          <div className="list__item">
            {filteredOptions && (
              <Card
                options={filteredOptions[0]}
                onClick={() => {
                  history.push('/history')
                }}
              />
            )}
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
    buildList: state.history.buildList,
    details: state.build,
  }
}

const mapDispatchToProps = {
  getBuildList,
  saveDetailsByBuildId,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details))
