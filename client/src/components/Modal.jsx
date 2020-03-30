import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { LinkButton, Icon, Input, Button } from '.'
import './scss/Modal.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const inputOption = {
  label: 'Enter the commit hash which you want to build.',
  placeholder: 'Commit hash',
  id: 'commitHashBuild',
  isRequired: false,
  vertical: true,
}

const Modal = ({ children, className, onSubmit, onCancel }) => {
  const cnModal = cn('modal')
  const [inputValue, setInputValue] = useState()

  return (
    <div className={cnModal()}>
      <div className={cnModal('content')}>
        <div className={cnModal('title')}>
          <div className="modal__header text text_type_h2 text_size_18-22">New build</div>
        </div>
        <Input
          options={inputOption}
          change={(e, value) => {
            setInputValue(value)
          }}
        />
        <div className="modal__controls">
          <Button className={{ size: 'm', view: 'action' }} onClick={(e) => onSubmit(e, inputValue)}>
            Run build
          </Button>
          <Button className={{ size: 'm', view: 'control' }} onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.string || PropTypes.bool),
}
Modal.defaultProps = {
  children: '',
  className: {},
}

export default Modal