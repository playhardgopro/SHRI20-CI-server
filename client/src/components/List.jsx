import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getBuildList } from '../store/actionCreators'
import { Card } from '.'
import './scss/List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

const Cards = (ctx) => {
  return ctx.props.historyPage.buildList.map((el) => <Card key={el.id} />)
}

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.getBuildList()
  }

  handleClick = (event, buildNumber) => {
    console.log(buildNumber, 'click')
    this.props.history.push(`build/${buildNumber}`)
  }

  render() {

// console.log(this.props)

    return (
      <ul className={cnList}>
        {this.props.historyPage.buildList &&
          this.props.historyPage.buildList.map((el) => {
            return <Card options={el} onClick={this.handleClick} />
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
    historyPage: state.history,
  }
}

const mapDispatchToProps = {
  getBuildList,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
