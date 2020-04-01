import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Icon } from '.'
import './scss/Button.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Button = ({ children, onClick, className, disabled, active, url, icon, hideText, empty }) => {
  const cnButton = cn('button')
  const cnHide = [cnButton('text'), 'decorator', 'hide-mobile'].join(' ')

  return (
    <button type="button" className={cnButton(className)} disabled={disabled} onClick={onClick}>
      {icon && <Icon name={icon.name} className={{ size: icon.size }} />}
      {!empty && !hideText && <div className={cnButton('text')}>{children}</div>}
      {!empty && hideText && <div className={cnHide}>{children}</div>}
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
  children: null,
  onClick: () => {},
  className: {},
  disabled: false,
  active: false,
}

export default Button
