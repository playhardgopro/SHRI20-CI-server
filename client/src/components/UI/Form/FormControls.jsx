// import React from 'react'
import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { withRouter, useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { saveSettings, getSettings, postSettings, isLoading } from '../../../store/actionCreators'

import { Input, Button } from '../..'
import './Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnForm = cn('form')

const FormControls = ({ postSettings, saveSettings, isLoading, settings }) => {
  const history = useHistory()
  const isLoadingFlag = useSelector((state) => state.settings.isLoading)
  const handleSave = () => {
    postSettings(settings).then((resolve) => {
      if (resolve.success) {
        saveSettings(settings)
        history.push('/history')
      } else {
        isLoading(false)
      }
    })
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <div className="form__controls">
      <Button className={{ size: 'm', view: 'action' }} onClick={handleSave} disabled={isLoadingFlag}>
        Save
      </Button>
      <Button className={{ size: 'm', view: 'control' }} onClick={handleCancel} disabled={isLoadingFlag}>
        Cancel
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  saveSettings,
  getSettings,
  postSettings,
  isLoading,
}

FormControls.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
FormControls.defaultProps = {
  children: '',
  className: {},
}

export default connect(null, mapDispatchToProps)(FormControls)
