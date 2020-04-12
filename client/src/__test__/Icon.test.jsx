import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '../components/UI/Icon/Icon'

describe('Icon', () => {
  const names = [
    'calendar',
    'close',
    'commit',
    'error',
    'success',
    'user',
    'warning',
    'settings',
    'run',
    'rebuild',
    'clock',
  ]
  names.forEach((name) => {
    it(`${name} renders correctly`, () => {
      const icon = renderer.create(<Icon name={name} />).toJSON()
      expect(icon).toMatchSnapshot()
    })
  })
})
