import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getBuildList, getDetailsByBuildId } from '../../../store/actionCreators'
import { Card, Button } from '../../'
import './List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

class List extends Component {
  state = { showButton: true }

  handleClick = (event, buildNumber, buildId) => {
    const { getDetailsByBuildId, history } = this.props
    getDetailsByBuildId(buildId)
    history.push(`build/${buildNumber}`)
  }

  handleShowMore = () => {
    const { getBuildList, buildList } = this.props
    let currentAmount = buildList.length || 10

    this.setState((state) => {
      if (currentAmount >= buildList[0].buildNumber) {
      return {
        showButton: !state.showButton
      }
    }
    })
    currentAmount += 10
    getBuildList(currentAmount)
  }

  render() {
    const { buildList } = this.props
    const { showButton } = this.state

    return (
      <ul className={cnList()}>
        {buildList &&
          buildList.map((el) => {
            return (
              <li key={el.buildNumber} className={cnList('item')}>
                <Card options={el} onClick={this.handleClick} />
              </li>
            )
          })}
        <div className={cnList('controls')}>
          {showButton && (
            <Button className={{ size: 'm', view: 'control' }} onClick={this.handleShowMore}>
              Show more
            </Button>
          )}
        </div>
      </ul>
    )
  }
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
List.defaultProps = {
  children: '',
  className: {},
}
function mapStateToProps(state) {
  return {
    buildList: state.history.buildList,
  }
}

const mapDispatchToProps = {
  getBuildList,
  getDetailsByBuildId,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
