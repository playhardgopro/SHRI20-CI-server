import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Text, Button } from '../..'
import './InputGroup.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnInput = cn('input')
const cnText = cn('text')

export const Input = ({
  id,
  name,
  clearable,
  onClear,
  inputRef,
  placeholder,
  status,
  className,
  text,
  width,
  size,
}) => {
  const handleClear = (e) => {
    onClear({ name })
  }
  return (
    <div className={cnInput('controls')}>
      <input
        id={id}
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        className={cnInput({ ...className, status, width, size }, [cnText({ size: '13-15' })])}
      />
      <div className={cnInput('controls-append')}>
        {clearable && (
          <Button
            className={{ size: 'm', distribute: 'center', view: 'control' }}
            icon={{ name: 'close', size }}
            onClick={handleClear}
            empty
          />
        )}
        {text && <Text className={{ size: '13-18' }}>{text}</Text>}
      </div>
    </div>
  )
}

export default Input

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm']),
  clearable: PropTypes.bool,
  onClear: PropTypes.func,
  status: PropTypes.oneOf(['invalid', 'valid', '']),
  width: PropTypes.oneOf(['full', '52']),
}

Input.defaultProps = {
  placeholder: '',
  width: 'full',
  clearable: false,
  status: '',
  size: 'm',
  onClear: () => {},
}
