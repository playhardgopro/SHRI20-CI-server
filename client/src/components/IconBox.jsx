import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/IconBox.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const IconBox = ({ children, className }) => {
  const classes = cn('icon-box')(className)

  return (
    <div className="icon-box">
      <div className="icon-box__icon text text_view_success">{children}</div>
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
