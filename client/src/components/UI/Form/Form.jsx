// import React from 'react'
import React, { useState, useEffect } from 'react'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { saveSettings, getSettings, postSettings, getBuildList } from '../../../store/actionCreators'

import { InputGroup, Button, Input, Text } from '../..'
import './Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnForm = cn('form')
const cnInput = cn('input')
const textStyle = { size: '13-18', type: 'h2' }

const Form = ({ postSettings, saveSettings, getBuildList }) => {
  const defaultValues = useSelector((state) => state.settings)
  const history = useHistory()
  const isLoading = useSelector((state) => state.settings.isLoading)
  const { register, handleSubmit, errors, setValue, reset } = useForm()

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const handleSave = (settings) => {
    postSettings(settings)
      .then(() => getBuildList())
      .then((resolve) => {
        if (resolve.success) {
          saveSettings(settings)
          history.push('/history')
        } else {
          isLoading(false)
        }
      })
  }

  const handleCancel = () => {
    history.go(-1)
  }

  const handleClear = ({ name }) => {
    setValue(name, '')
  }

  const validators = {
    required: { value: true, message: 'Field is required' },
    pattern: { value: /^[1-9]\d*$/, message: 'Field must be number and not equal to 0' },
  }

  const getValidators = (rules) => Object.fromEntries(Object.entries(validators).filter(([key]) => rules.includes(key)))

  return (
    <form className={cnForm()}>
      <div className={cnForm('title')}>
        <div className="form__header text text_type_h2 text_size_15-20">Settings</div>
        <div className="form__subheader text text_type_h3 text_size_13-18 text_view_ghost">
          Configure repository connection and synchronization settings.
        </div>
      </div>
      <div className={cnForm('items')}>
        <div className={cnForm('item', { 'indent-t': 'xl' })}>
          <div className={cnInput('group', { vertical: true })}>
            <label className={cnInput('label', { required: true })} htmlFor="repository">
              <Text className={textStyle}>Github repository</Text>
            </label>
            <Input
              id="repoName"
              placeholder="username/reponame"
              onClear={handleClear}
              inputRef={register(getValidators(['required']))}
              status={errors.repoName && 'invalid'}
              name="repoName"
              clearable
            />
            {errors.repoName && <span style={{ color: 'red' }}>{errors.repoName.message}</span>}
          </div>
        </div>
        <div className={cnForm('item', { 'indent-t': 'xl' })}>
          <div className={cnInput('group', { vertical: true })}>
            <label className={cnInput('label', { required: true })} htmlFor="repository">
              <Text className={textStyle}>Build command</Text>
            </label>
            <Input
              id="buildCommand"
              placeholder="npm run build"
              onClear={handleClear}
              inputRef={register(getValidators(['required']))}
              status={errors.buildCommand && 'invalid'}
              name="buildCommand"
              clearable
            />
            {errors.buildCommand && <span style={{ color: 'red' }}>{errors.buildCommand.message}</span>}
          </div>
        </div>
        <div className={cnForm('item', { 'indent-t': 'xl' })}>
          <div className={cnInput('group', { vertical: true })}>
            <label className={cnInput('label', { required: true })} htmlFor="repository">
              <Text className={textStyle}>Main branch</Text>
            </label>
            <Input
              id="mainBranch"
              placeholder="master"
              onClear={handleClear}
              inputRef={register(getValidators(['required']))}
              status={errors.mainBranch && 'invalid'}
              name="mainBranch"
              clearable
            />
            {errors.mainBranch && <span style={{ color: 'red' }}>{errors.mainBranch.message}</span>}
          </div>
        </div>
        <div className={cnForm('item', { 'indent-t': 'xl' })}>
          <div className={cnInput('group', { vertical: false })}>
            <label className={cnInput('label', { required: false })} htmlFor="period">
              <Text className={textStyle}>Synchronize every</Text>
            </label>
            <Input
              id="period"
              placeholder="10"
              onClear={handleClear}
              inputRef={register(getValidators(['required', 'pattern']))}
              status={errors.period && 'invalid'}
              name="period"
              width="52"
              text="minutes"
            />
            {errors.period && <span style={{ color: 'red' }}>{errors.period.message}</span>}
          </div>
        </div>
      </div>
      <div className={cnForm('controls')}>
        <Button className={{ size: 'm', view: 'action' }} onClick={handleSubmit(handleSave)} disabled={isLoading}>
          Save
        </Button>
        <Button className={{ size: 'm', view: 'control' }} onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
const mapDispatchToProps = {
  saveSettings,
  getSettings,
  postSettings,
  getBuildList,
}

export default connect(null, mapDispatchToProps)(Form)
