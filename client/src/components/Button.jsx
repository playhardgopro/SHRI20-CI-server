import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Button.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Button = ({ children, onClick, className, disabled, active, url }) => {
  const classes = cn('button')(className)

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}
Button.defaultProps = {
  children: 'Default button',
  onClick: () => {},
  className: {},
  disabled: false,
  active: false,
}

export default Button
