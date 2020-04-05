// import React from 'react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector } from 'react-redux'
import { saveSettings, getSettings, postSettings, isLoading } from '../../../store/actionCreators'

import { InputGroup } from '../..'
import FormControls from './FormControls'
import './Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnForm = cn('form')

const options = [
  {
    label: 'Github repository',
    placeholder: 'username/repo-name',
    id: 'repoName',
    isRequired: true,
    vertical: true,
  },
  {
    label: 'Build command',
    placeholder: 'npm run build',
    id: 'buildCommand',
    isRequired: true,
    vertical: true,
  },
  {
    label: 'Main branch',
    placeholder: 'master',
    id: 'mainBranch',
    isRequired: false,
    vertical: true,
  },
  {
    label: 'Synchronize every',
    placeholder: '10',
    id: 'period',
    isRequired: false,
    vertical: false,
    text: true,
    numberMask: true,
  },
]

const Form = ({ getSettings }) => {
  const settings = useSelector((state) => state.settings)
  const [inputValue, setInputValue] = useState(settings)
  // useEffect(() => {
  //   getSettings()
  // }, [inputValue])

  function handleChange(id, val) {
    setInputValue({ [id]: val })
  }

  const Inputs = () => {
    return options.map((el) => (
      <div key={el.id} className={cnForm('item', { 'indent-t': 'xl' })}>
        <InputGroup options={el} change={handleChange} />
      </div>
    ))
  }

  return (
    <form className={cnForm()}>
      <div className={cnForm('title')}>
        <div className="form__header text text_type_h2 text_size_15-20">Settings</div>
        <div className="form__subheader text text_type_h3 text_size_13-18 text_view_ghost">
          Configure repository connection and synchronization settings.
        </div>
      </div>
      <div className={cnForm('items')}>{Inputs()}</div>
      <FormControls settings={inputValue} />
    </form>
  )
}

const mapDispatchToProps = {
  saveSettings,
  getSettings,
  postSettings,
  isLoading,
}

export default connect(null, mapDispatchToProps)(Form)
