import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const List = ({ children, className }) => {
  const list = cn('list')(className)
  return <ul className={list}>{children}</ul>
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
List.defaultProps = {
  children: '',
  className: {},
}

export default List
