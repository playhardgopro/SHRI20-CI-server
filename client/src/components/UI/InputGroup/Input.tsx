import * as React from 'react'
import { withNaming } from '@bem-react/classname'
import { Text, Button } from '../../index'
import './InputGroup.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnInput = cn('input')
const cnText = cn('text')

type name = 'repoName' | 'buildCommand' | 'mainBranch' | 'period'
interface InputProps {
  clearable?: boolean
  id: name
  name: name
  width?: 'full' | 52
  size?: 's' | 'm'
  placeholder: string
  onClear(name: name): void
  text?: string
  status: 'invalid' | 'valid' | undefined
  className?: {}
  inputRef: (ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null) => void
}

export const Input: React.FC<InputProps> = ({
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
  const handleClear = () => {
    onClear(name)
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
            icon={{ name: 'close', size: 'm' }}
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
