import * as React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './IconBox.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const IconBox = ({ children, className, textStyle }) => {
  const cnIconBox = cn('icon-box')
  const cnText = cn('text')

  return (
    <div className={cnIconBox()}>
      <div className={`${cnIconBox('icon')} ${cnText(textStyle)}`}>{children}</div>
    </div>
  )
}

IconBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.string || PropTypes.bool),
}
IconBox.defaultProps = {
  children: '',
  className: {},
}

export default IconBox
