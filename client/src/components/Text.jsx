import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Text.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Text = ({ children, className }) => {
  const cnText = cn('text')

  return <span className={cnText(className)}>{children}</span>
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Text.defaultProps = {
  children: '',
  className: {},
}

export default Text
