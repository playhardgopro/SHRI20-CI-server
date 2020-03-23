import React from 'react'
// import './scss/Footer.scss'

export default function Footer() {
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
