import React from 'react'
import renderer from 'react-test-renderer'
import Input from '../components/UI/InputGroup/Input'

describe('Input', () => {
  it('renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" placeholder="" value="1234" size="m" width="full" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('empty renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" placeholder="test" size="m" width="full" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('short renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" placeholder="" value="1234" width="52" size="m" width={52} text="minutes" />).toJSON()

    expect(input).toMatchSnapshot()
  })
  it('invalid renders correctly', () => {
    const input = renderer.create(<Input id="test" name="test" placeholder="" value="1234" status="invalid" size="m" width="full" clearable />).toJSON()

    expect(input).toMatchSnapshot()
  })
})
