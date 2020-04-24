import * as React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './Grid.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Grid = ({ children, className }) => {
  const block = cn('grid')(className.block)
  const elem = cn('grid', 'fraction')(className.elem)

  return (
    <div className={block}>
      <div className={elem}>{children}</div>
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object])),
}
Grid.defaultProps = {
  children: '',
  className: {},
}

export default Grid
