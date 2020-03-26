import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Input } from '.'
import './scss/Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnForm = cn('form')

const options = [
  {
    label: 'Github repository',
    placeholder: 'username/repo-name',
    id: 'repository',
    isRequired: true,
    vertical: true,
  },
  {
    label: 'Build command',
    placeholder: 'npm run build',
    id: 'cmd',
    isRequired: false,
    vertical: true,
  },
  {
    label: 'Main branch',
    placeholder: 'master',
    id: 'branch',
    isRequired: false,
    vertical: true,
  },
  {
    label: 'Synchronize every',
    placeholder: '10',
    id: 'sync',
    isRequired: false,
    vertical: false,
    text: true,
  },
]

const FormControls = () => {
  return (
    <div className="form__controls">
      <button type="submit" className="button button_size_m button_view_action">
        <div className="button__text">Save</div>
      </button>
      <button type="button" className="button button_size_m button_view_control">
        <div className="button__text">Cancel</div>
      </button>
    </div>
  )
}

const Inputs = () => {
  return options.map((el) => (
    <div className={cnForm('item', { 'indent-t': 'xl' })}>
      <Input options={el} />
    </div>
  ))
}

const Form = ({ children, className }) => {
  return (
    <form className={cnForm()}>
      <div className={cnForm('title')}>
        <div className="form__header text text_type_h2 text_size_15-20">Settings</div>
        <div className="form__subheader text text_type_h3 text_size_13-18 text_view_ghost">
          Configure repository connection and synchronization settings.
        </div>
      </div>
      <div className={cnForm('items')}>{Inputs()}</div>
      {FormControls()}
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
