import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getBuildList, getDetailsByBuildId } from '../store/actionCreators'
import { Card, Modal } from '.'
import './scss/List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
 
  handleClick = (event, buildNumber, buildId) => {
    this.props.getDetailsByBuildId(buildId)
    this.props.history.push(`build/${buildNumber}`)
  }

  render() {

    return (
      <ul className={cnList()}>
        {this.props.buildList &&
          this.props.buildList.map((el) => {
            return (<li key={el.buildNumber} className={cnList('item')}><Card options={el} onClick={this.handleClick} /></li>)
          })}
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
  getBuildList, getDetailsByBuildId
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
