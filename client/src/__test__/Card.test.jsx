import React from 'react'
import renderer from 'react-test-renderer'
import Card from '../components/UI/Card/Card'

jest.mock('react-router-dom', () => ({
  useRouteMatch: jest.fn(() => {
    return { path: '/history' }
  }),
}))
describe('Card', () => {
  it('history renders correctly', () => {
    const options = {
      id: '8c677446-d637-4f4c-8cca-f77baa71bd7c',
      configurationId: '262f7f07-1e2c-44f0-8931-cf4f5012c10b',
      buildNumber: 5,
      commitMessage: "Merge branch 'dz-4-react'",
      commitHash: '563db2c756a782e94c552ca86c50dfc16b558ab4',
      branchName: 'master',
      authorName: 'Daniel',
      status: 'Waiting',
      start: '2020-04-12T20:13:31.333Z',
    }
    const card = renderer.create(<Card options={options} />).toJSON()
    expect(card).toMatchSnapshot()
  })
})
