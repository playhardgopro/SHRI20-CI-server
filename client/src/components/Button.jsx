import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
// import './scss/Button.scss'
const cn = withNaming({ n: '', e: '__', m: '_' })

const Button = ({ children, onClick, className, disabled, active }) => {
  const classes = cn('button')(className)

  return (
    <button type="button" className={classes} disable={disabled} onClick={onClick}>
      {children}
    </button>
    // <button type="button" className="button button_size_s button_distribute_center button_view_control">
    // <div className="icon icon_size_s">
    //   <svg width="12" height="12" viewbox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M8.77548 3.03097C8.01915 2.32277 7.03761 1.93456 5.99632 1.93548C4.12234 1.93713 2.50452 3.22205 2.05783 5.00444C2.02531 5.13419 1.90972 5.22581 1.77595 5.22581H0.389589C0.208185 5.22581 0.070379 5.06112 0.103935 4.88284C0.627411 2.103 3.06806 0 6 0C7.60761 0 9.06752 0.632322 10.1447 1.66173L11.0088 0.797661C11.3746 0.431879 12 0.690944 12 1.20825V4.45161C12 4.7723 11.74 5.03226 11.4194 5.03226H8.17599C7.65869 5.03226 7.39962 4.40683 7.7654 4.04102L8.77548 3.03097ZM0.580645 6.96774H3.82401C4.34131 6.96774 4.60038 7.59317 4.2346 7.95898L3.22452 8.96906C3.98085 9.67727 4.96246 10.0655 6.00377 10.0645C7.87679 10.0628 9.49527 8.7788 9.94217 6.99561C9.97468 6.86586 10.0903 6.77424 10.224 6.77424H11.6104C11.7918 6.77424 11.9296 6.93893 11.8961 7.11721C11.3726 9.897 8.93194 12 6 12C4.39239 12 2.93248 11.3677 1.85528 10.3383L0.99121 11.2023C0.625427 11.5681 0 11.3091 0 10.7917V7.54839C0 7.2277 0.25996 6.96774 0.580645 6.96774Z" />
    //   </svg>
    // </div>
    // <div className="button__text decorator hide_mobile">Rebuild</div>
    // </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
}
Button.defaultProps = {
  children: 'Default button',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false,
}

export default Button
