import React from 'react'
import renderer from 'react-test-renderer'
import Input from '../components/UI/InputGroup/Input'

describe('Input', () => {
  it('renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" value="1234" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('empty renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" placeholder="test" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('short renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" value="1234" width="52" text="minutes" />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('invalid renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" value="1234" status="invalid" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
})
