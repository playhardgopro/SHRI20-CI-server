import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { icons } from '../icons'
import './scss/Icon.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Icon = ({ children, className, name }) => {
  const classes = cn('icon')(className)

  return <span className={classes}>{icons[name]()}</span>
}

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.string || PropTypes.bool),
  name: PropTypes.string.isRequired,
}
Icon.defaultProps = {
  children: '',
  className: {},
}

export default Icon
