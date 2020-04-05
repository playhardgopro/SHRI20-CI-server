import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withNaming } from '@bem-react/classname'
import './Footer.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Footer = ({ children, className }) => {
  const cnFooter = cn('footer')
  const cnText = cn('text')
  return (
    <div className={cnFooter()}>
      <div className={cnFooter('content')}>
        <div className={cnFooter('links')}>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>Support</div>
          </Link>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>Learning</div>
          </Link>
        </div>
        <div className={cnFooter('copyright')}>
          <div className={cnText({ size: '13-18', view: 'ghost' })}>&copy; 2020 Daniil Egortsev</div>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Footer.defaultProps = {
  children: '',
  className: {},
}

export default Footer
