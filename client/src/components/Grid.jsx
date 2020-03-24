import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Text, Button } from '.'
import './scss/Grid.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Grid = ({ children, className }) => {
  const classes = cn('grid', 'container')(className)
  return (
    <div className="grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_4">
      <div className="grid__fraction grid__fraction_m-col_4 grid__fraction_s-col_4 grid__fraction_m-offset_4">
        {children}
      </div>
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Grid.defaultProps = {
  children: '',
  className: {},
}

export default Grid
