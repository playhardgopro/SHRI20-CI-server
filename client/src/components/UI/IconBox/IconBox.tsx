import * as React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './IconBox.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

interface IconBoxProps {
  textStyle: {}
}

const IconBox: React.FC<IconBoxProps> = ({ children, textStyle }) => {
  const cnIconBox = cn('icon-box')
  const cnText = cn('text')

  return (
    <div className={cnIconBox()}>
      <div className={`${cnIconBox('icon')} ${cnText(textStyle)}`}>{children}</div>
    </div>
  )
}

export default IconBox
