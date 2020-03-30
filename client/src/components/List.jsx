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

  componentWillMount() {
    this.props.getBuildList()
  }
  // componentDidMount(){
  //   this.setState({list: this.props.historyPage.buildList})
  // }
 
  handleClick = (event, buildNumber, buildId) => {
    this.props.getDetailsByBuildId(buildId)
    this.props.history.push(`build/${buildNumber}`)
  }

  render() {

// console.log(this.props)

    return (
      <ul className={cnList()}>
        {this.props.historyPage.buildList &&
          this.props.historyPage.buildList.map((el) => {
            return (<li  key={el.buildNumber} className={cnList('item')}><Card options={el} onClick={this.handleClick} /></li>)
          })}
          {/* <Modal></Modal> */}
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
  getBuildList, getDetailsByBuildId
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
