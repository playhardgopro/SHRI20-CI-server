import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Text, Icon, Button } from '.'
import './scss/Input.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const cnInput = cn('input')

const textStyle = { size: '13-18', type: 'h2' }

const LilInput = ({ id, placeholder, isShort }) => {
  const inputClass = { size: 'm', width: isShort ? 52 : 'full' }
  return (
    <input className={cnInput(inputClass, ['text', { size: '13-15' }])} id={id} type="text" placeholder={placeholder} />
  )
}

const ControlsAppend = ({ text }) => {
  return text ? (
    <Text className={{ size: '13-18' }}>minutes</Text>
  ) : (
    <button type="button" className="button button_size_m button_distribute_center button_view_control">
      <Icon name="close" className={{ size: 'm' }} />
    </button>
  )
}

const Input = ({ children, className, options }) => {
  const { placeholder, label, isRequired, id, vertical, text } = options
  return (
    <div className={cnInput('group', { vertical })}>
      <label className={cnInput('label', { required: isRequired })} htmlFor="repository">
        <Text className={textStyle}>{label}</Text>
      </label>
      <div className={cnInput('controls')}>
        <LilInput id={id} placeholder={placeholder} isShort={text} />
        <div className={cnInput('controls-append')}>{ControlsAppend({ text })}</div>
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
  options: { label: '', placeholder: '' },
}

export default Input
