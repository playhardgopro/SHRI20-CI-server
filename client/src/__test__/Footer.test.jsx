import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../components/common/Footer/Footer'

jest.mock('react-router-dom', () => ({
  Link: (props) => <a href={props.to}>{props.children}</a>,
}))
describe('Footer', () => {
  it('renders correctly', () => {
    const footer = renderer.create(<Footer />).toJSON()

    expect(footer).toMatchSnapshot()
  })
})
