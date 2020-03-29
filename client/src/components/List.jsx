import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { getBuildList } from '../store/actionCreators'
import { Card } from '.'
import './scss/List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

const Cards = (ctx) => {
  return ctx.props.historyPage.buildList.map((el) => <Card key={el.id} />)
}

// const List = ({ children, className, history }) => {
//   const list = cn('list')(className)
//   return (
//     <ul className={list}>
//       <Card />
//       {Cards(this)}
//       {/* <div>{history}</div> */}
//     </ul>
//   )
// }

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // state={...this.props.historyPage}
  // this.setState
  // props={className, history}

  componentWillMount() {
    this.props.getBuildList()
  }

  render() {
    return (
      <ul className={cnList}>
        {this.props.historyPage.buildList &&
          this.props.historyPage.buildList.map((el) => {
            return <Card options={el} />
          })}
        {/* <Card /> */}
        {/* {Cards(this)} */}
        <div>{console.log(this.props.historyPage.buildList, 'props')}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List)
