import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Input.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Input = ({ children, className }) => {
  return (
    <div className="input__group input__group_vertical">
      <label className="input__label input__label_required text text_size_13-18 text_type_h2" htmlFor="repository">
        Github repository
      </label>
      <div className="input__controls">
        <input
          className="input input_size_m input_width_full text text_size_13-15"
          id="repository"
          type="text"
          placeholder="username/repo-name"
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Input.defaultProps = {
  children: '',
  className: {},
}

export default Input
