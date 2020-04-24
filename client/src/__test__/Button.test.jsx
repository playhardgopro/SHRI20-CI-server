import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../components/UI/Button/Button'

describe('Button', () => {
  it('renders hidden correctly', () => {
    const hiddenBtn = renderer
      .create(
        <Button
          icon={{ name: 'settings', size: 's' }}
          className={{ size: 's', distribute: 'center', view: 'control', hidden: true }}
          hideText
        >
          Settings
        </Button>
      )
      .toJSON()
    expect(hiddenBtn).toMatchSnapshot()
    return undefined
  })
  it('renders correctly', () => {
    const btn = renderer
      .create(
        <Button
          icon={{ name: 'settings', size: 's' }}
          className={{ size: 's', distribute: 'center', view: 'control', hidden: false }}
          hideText
        >
          Settings
        </Button>
      )
      .toJSON()
    expect(btn).toMatchSnapshot()
    return undefined
  })
})
