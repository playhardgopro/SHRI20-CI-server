import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Input } from '.'
import './scss/Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Form = ({ children, className }) => {
  return (
    <form className="form">
      <div className="form__title">
        <div className="form__header text text_type_h2 text_size_15-20">Settings</div>
        <div className="form__subheader text text_type_h3 text_size_13-18 text_view_ghost">
          Configure repository connection and synchronization settings.
        </div>
      </div>
      <div className="form__items">
        <Input />
        <div className="form__item form__item_indent-t_xl">
          <div className="input__group input__group_vertical">
            <label className="input__label text text_size_13-18 text_type_h2" htmlFor="cmd">
              Build command
            </label>
            <div className="input__controls">
              <input
                className="input input_size_m input_width_full text text_size_13-15"
                id="cmd"
                type="text"
                value="npm ci &amp;&amp; npm run build"
              />
              <div className="input__controls-append">
                <button type="button" className="button button_size_m button_distribute_center button_view_control">
                  <div className="icon icon_size_m">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 12.4 12.4 16 8 16ZM12 5.12L10.88 4L8 6.88L5.12 4L4 5.12L6.88 8L4 10.88L5.12 12L8 9.12L10.88 12L12 10.88L9.12 8L12 5.12Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="form__item form__item_indent-t_xl">
          <div className="input__group input__group_vertical">
            <label className="input__label text text_size_13-18 text_type_h2" htmlFor="branch">
              Main branch
            </label>
            <div className="input__controls">
              <input
                className="input input_size_m input_width_full text text_size_13-15"
                id="branch"
                type="text"
                value="master"
              />
              <div className="input__controls-append">
                <button type="button" className="button button_size_m button_distribute_center button_view_control">
                  <div className="icon icon_size_m">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16C3.6 16 0 12.4 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 12.4 12.4 16 8 16ZM12 5.12L10.88 4L8 6.88L5.12 4L4 5.12L6.88 8L4 10.88L5.12 12L8 9.12L10.88 12L12 10.88L9.12 8L12 5.12Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="form__item form__item_indent-t_xl">
          <div className="input__group">
            <label className="input__label text text_size_13-18 text_type_h2" htmlFor="sync">
              Synchronize every
            </label>
            <div className="input__controls">
              <input
                className="input input_size_m input_width_52 text text_size_13-15 text_right"
                id="sync"
                value="10"
              />
              <div className="input__controls-append">
                <span className="text text_size_13-18">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form__controls">
        <button type="submit" className="button button_size_m button_view_action">
          <div className="button__text">Save</div>
        </button>
        <button type="button" className="button button_size_m button_view_control">
          <div className="button__text">Cancel</div>
        </button>
      </div>
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Form.defaultProps = {
  children: '',
  className: {},
}

export default Form
