import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Text, Button, Grid } from '.'
import './scss/Layout.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
// grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_4
// grid__fraction grid__fraction_m-col_4 grid__fraction_s-col_4 grid__fraction_m-offset_4

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
