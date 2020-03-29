import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { saveSettings } from '../store/actionCreators'
import { Text, Icon, Button } from '.'
import './scss/Input.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnInput = cn('input')
const textStyle = { size: '13-18', type: 'h2' }
const cnText = cn('text')

const Input = ({ children, className, options, change, settings }) => {
  const { placeholder, label, isRequired, id, vertical, text } = options
  const [value, setValue] = useState(settings[id])
  const inputClass = { size: 'm', width: text ? 52 : 'full' }
  const handleClear = () => {
    setValue('')
  }

  return (
    <div className={cnInput('group', { vertical })}>
      <label className={cnInput('label', { required: isRequired })} htmlFor="repository">
        <Text className={textStyle}>{label}</Text>
      </label>
      <div className={cnInput('controls')}>
        <input
          value={value}
          onChange={(e) => {
            change(id, e.target.value)
            setValue(e.target.value)
          }}
          className={cnInput(inputClass, [cnText({ size: '13-15' })])}
          id={id}
          type="text"
          placeholder={placeholder}
        />
        <div className={cnInput('controls-append')}>
          {text ? (
            <Text className={{ size: '13-18' }}>minutes</Text>
          ) : (
            <button
              type="button"
              onClick={handleClear}
              className="button button_size_m button_distribute_center button_view_control"
            >
              <Icon name="close" className={{ size: 'm' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  options: PropTypes.objectOf(PropTypes.oneOfType(PropTypes.string, PropTypes.bool)),
}

Input.defaultProps = {
  children: '',
  className: {},
  isShort: false,
  options: {
    label: '',
    placeholder: '',
    id: '',
    isRequired: false,
    vertical: false,
    text: false,
  },
}
// LilInput.propTypes = {
//   isShort: PropTypes.bool,
//   placeholder: PropTypes.string,
//   id: PropTypes.string,
// }
// LilInput.defaultProps = {
//   isShort: false,
//   placeholder: '',
//   id: '',
// }
function mapStateToProps(state) {
  return {
    settings: state.settings,
  }
}
const mapDispatchToProps = {
  saveSettings,
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)
