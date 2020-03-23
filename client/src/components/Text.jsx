import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
// import './scss/Header.scss'
const cn = withNaming({ n: '', e: '__', m: '_' })

const Text = ({ children, className }) => {
  const classes = cn('text')(className)

  return <div className={classes}>{children}</div>
}

Text.propTypes = {
  children: PropTypes.node || PropTypes.string,
  className: PropTypes.string,
}
Text.defaultProps = {
  children: '',
  className: '',
}

export default Text
