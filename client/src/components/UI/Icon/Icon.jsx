import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { icons } from '../../../icons'
import './Icon.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Icon = ({ className, name }) => {
  const cnIcon = cn('icon')

  return <span className={cnIcon(className)}>{icons[name].render()}</span>
}

Icon.propTypes = {
  // children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.string || PropTypes.bool),
  name: PropTypes.string.isRequired,
}
Icon.defaultProps = {
  // children: '',
  className: {},
}

export default Icon
