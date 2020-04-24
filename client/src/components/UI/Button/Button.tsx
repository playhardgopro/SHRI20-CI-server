import * as React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Icon } from '../../index'
import './Button.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Button = ({ children, onClick, className, disabled, icon, hideText, empty }) => {
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
  empty: PropTypes.bool,
  hideText: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
    PropTypes.bool,
  ]),
  // active: PropTypes.bool,
}
Button.defaultProps = {
  children: null,
  onClick: () => {},
  className: {},
  disabled: false,
  empty: false,
  hideText: false,
  icon: false,
  // active: false,
}

export default Button
