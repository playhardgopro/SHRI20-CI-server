import * as React from 'react'
import { withNaming } from '@bem-react/classname'
import { Icon } from '../../index'
import './Button.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

interface ButtonProps {
  onClick(): void
  className: {
    size: 'm' | 's'
    view?: 'action' | 'control'
    distribute?: 'center'
    hidden?: boolean
  }
  disabled?: boolean
  icon?: { name: 'settings' | 'run' | 'rebuild'; size: 's' | 'm' }
  hideText?: boolean
  empty?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, icon, hideText, empty }) => {
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

export default Button
