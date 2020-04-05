import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector } from 'react-redux'
import MaskedInput from 'react-text-mask'
import { saveSettings } from '../../../store/actionCreators'
import { Text, Button } from '../..'
import './InputGroup.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnInput = cn('input')
const textStyle = { size: '13-18', type: 'h2' }
const cnText = cn('text')

const Masked = ({ value, setValue, change, valid, invalid, inputClass, placeholder, id }) => {
  return (
    <MaskedInput
      mask={[/\d/, /\d/, /\d/]}
      defaultValue={value}
      value={value}
      onChange={(e) => {
        change(id, e.target.value)
        setValue(e.target.value)
      }}
      className={cnInput({ ...inputClass, invalid, valid }, [cnText({ size: '13-15' })])}
      id={id}
      type="text"
      placeholder={placeholder}
      guide={false}
    />
  )
}

const InputGroup = ({ children, className, options, change }) => {
  const { placeholder, label, isRequired, id, vertical, text, numberMask } = options
  const settings = useSelector((state) => state.settings)
  const [value, setValue] = useState(settings[id])
  const [invalid, setInvalid] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setValue(settings[id])
  }, [settings, id])

  useEffect(() => {
    isRequired && value === '' ? setInvalid(true) : setInvalid(false)
    isRequired && !invalid ? setValid(true) : setValid(false)
  }, [isRequired, value, invalid])
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
        {!numberMask && (
          <input
            defaultValue={value}
            value={value}
            onChange={(e) => {
              change(id, e.target.value)
              setValue(e.target.value)
            }}
            className={cnInput({ ...inputClass, invalid, valid }, [cnText({ size: '13-15' })])}
            id={id}
            type="text"
            placeholder={placeholder}
          />
        )}
        {numberMask && Masked({ ...options, valid, invalid, value, setValue, inputClass, change })}
        <div className={cnInput('controls-append')}>
          {text ? (
            <Text className={{ size: '13-18' }}>minutes</Text>
          ) : (
            <Button
              className={{ size: 'm', distribute: 'center', view: 'control' }}
              icon={{ name: 'close', size: 'm' }}
              onClick={handleClear}
              empty
            />
          )}
        </div>
      </div>
    </div>
  )
}

InputGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  options: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}

InputGroup.defaultProps = {
  children: '',
  className: {},
  options: {
    label: '',
    placeholder: '',
    id: '',
    isRequired: false,
    vertical: false,
    text: false,
  },
}

const mapDispatchToProps = {
  saveSettings,
}
export default connect(null, mapDispatchToProps)(InputGroup)
