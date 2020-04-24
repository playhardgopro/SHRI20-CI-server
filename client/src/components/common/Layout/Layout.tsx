import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './Layout.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Layout = ({ children, className }) => {
  const classes = cn('layout', 'container')(className)
  return <div className={classes}>{children}</div>
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Layout.defaultProps = {
  children: '',
  className: {},
}

export default Layout