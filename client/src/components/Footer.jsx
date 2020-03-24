import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Footer.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Footer = ({ children, className }) => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__links">
          <a href="#">
            <div className="text text_view_ghost text_size_13-18 text_type_link">Support</div>
          </a>
          <a href="#">
            <div className="text text_view_ghost text_size_13-18 text_type_link">Learning</div>
          </a>
        </div>
        <div className="footer__copyright">
          <div className="text text text_size_13-18 text_view_ghost">&copy; 2020 Your Name</div>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf([PropTypes.string, PropTypes.bool]),
}
Footer.defaultProps = {
  children: '',
  className: {},
}

export default Footer
