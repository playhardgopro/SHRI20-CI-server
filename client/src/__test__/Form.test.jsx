import React, { useRef, useState } from 'react'
import renderer from 'react-test-renderer'
import { withNaming } from '@bem-react/classname'
import Input from '../components/UI/InputGroup/Input'
import Button from '../components/UI/Button/Button'
import Text from '../components/UI/Text/Text'

// jest.mock('react-text-mask', () => (props) => <input type="text" {...{ ...props }} />)

const Stub = () => {
  const cn = withNaming({ n: '', e: '__', m: '_' })
  const cnForm = cn('form')
  const cnInput = cn('input')
  const textStyle = { size: '13-18', type: 'h2' }

  const errors = {
    repoName: { message: 'Field is required' },
    buildCommand: { message: 'Field is required' },
    mainBranch: { message: 'Field is required' },
    period: { message: 'Field is required' },
  }
  // const formRef = useRef(null)
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
              status={errors.repoName && 'invalid'}
              name="repoName"
              clearable
            />
            {errors.repoName && <Text className={{ ...textStyle, view: 'error' }}>{errors.repoName.message}</Text>}
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
              status={errors.buildCommand && 'invalid'}
              name="buildCommand"
              clearable
            />
            {errors.buildCommand && (
              <Text className={{ ...textStyle, view: 'error' }}>{errors.buildCommand.message}</Text>
            )}
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
              status={errors.mainBranch && 'invalid'}
              name="mainBranch"
              clearable
            />
            {errors.mainBranch && <Text className={{ ...textStyle, view: 'error' }}>{errors.mainBranch.message}</Text>}
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
              status={errors.period && 'invalid'}
              name="period"
              width="52"
              text="minutes"
            />
          </div>
          {errors.period && <Text className={{ ...textStyle, view: 'error' }}>{errors.period.message}</Text>}
          <Text className={{ ...textStyle, view: 'error' }}>Field is required</Text>
        </div>
      </div>
      <div className={cnForm('controls')}>
        <Button className={{ size: 'm', view: 'action' }} disabled={false}>
          Save
        </Button>
        <Button className={{ size: 'm', view: 'control' }} disabled={false}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
describe('Form', () => {
  it('renders correctly', () => {
    const form = renderer.create(<Stub />).toJSON()

    expect(form).toMatchSnapshot()
  })
})
