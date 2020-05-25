import * as React from 'react'
import { withNaming } from '@bem-react/classname'
import { useForm } from 'react-hook-form'
import { Input, Text, Button } from '../../index'
import './Modal.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

interface ModalProps {
  onSubmit(commitHash: string): void
  onCancel(): void
}

const Modal: React.FC<ModalProps> = ({ onSubmit, onCancel }) => {
  const cnModal = cn('modal')
  const cnText = cn('text')
  const cnInput = cn('input')
  const textStyle = { size: '13-18', type: 'h2' }
  const { register, handleSubmit, errors, setValue } = useForm<any>()
  const { locale } = window

  type name = 'commitHashBuild'

  const handleClear = (name: name) => {
    setValue(name, '')
  }

  const validators = {
    required: { value: true, message: 'Field is required' },
  }

  const getValidators = (rules: string[]) =>
    Object.fromEntries(Object.entries(validators).filter(([key]) => rules.includes(key)))

  return (
    <div className={cnModal()}>
      <div className={cnModal('content')}>
        <div className={cnModal('title')}>
          <div className={`${cnModal('header')} ${cnText({ type: 'h2', size: '18-22' })}`}>
            {locale.Modal.Form.header}
          </div>
        </div>
        <div className={cnInput('group', { vertical: true })}>
          <label className={cnInput('label', { required: true })} htmlFor="commitHashBuild">
            <Text className={textStyle}>{locale.Modal.Form.description}</Text>
          </label>
          <Input
            id="commitHashBuild"
            placeholder={locale.Modal.Input.commitHash.placeholder}
            onClear={handleClear}
            inputRef={register(getValidators(['required']))}
            status={errors.commitHashBuild && 'invalid'}
            name="commitHashBuild"
            size="m"
            width="full"
            clearable
          />
          {errors.commitHashBuild && (
            <Text className={{ ...textStyle, view: 'error' }}>{errors.commitHashBuild.message}</Text>
          )}
        </div>
        <div className={cnModal('controls')}>
          <Button className={{ size: 'm', view: 'action' }} onClick={handleSubmit(onSubmit)}>
            {locale.Modal.Button.RunBuild}
          </Button>
          <Button className={{ size: 'm', view: 'control' }} onClick={onCancel}>
            {locale.Modal.Button.Cancel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
