import React from 'react'
import renderer from 'react-test-renderer'
import Log from '../components/UI/Log/Log'

describe('Log', () => {
  it('renders correctly', () => {
    const log = renderer.create(<Log />).toJSON()

    expect(log).toMatchSnapshot()
  })
})
