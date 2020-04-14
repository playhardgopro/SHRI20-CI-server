import mockAxios from 'jest-mock-axios'
import store from '../store'
import * as action from '../store/actionCreators'

const list = [
  {
    id: 'a44cd66c-b7ad-4fa6-86db-d07dd5c342b6',
    configurationId: '59a4699d-9dbe-4cf2-8dd7-25caa7d4e2f3',
    buildNumber: 2,
    commitMessage: 'avadakedavra',
    commitHash: '563db2c756a78234234552ca86c50dfc16b558ab4',
    branchName: 'master',
    authorName: 'Volan De Mort',
    status: 'Success',
    start: '2020-02-11T12:45:54.313',
    duration: 9999,
  },
]

const settings = {
  repoName: 'repoName',
  buildCommand: 'buildCommand',
  mainBranch: 'mainBranch',
  period: '10',
}
const validatedSettings = {
  repoName: 'repoName',
  buildCommand: 'buildCommand',
  mainBranch: 'mainBranch',
  period: 10,
}

afterEach(() => {
  mockAxios.reset()
})

describe('Redux', () => {
  it('isLoading action', () => {
    store.dispatch(action.isLoading(true))

    expect(store.getState().settings.isLoading).toBe(true)
  })

  it('isCached action', () => {
    store.dispatch(action.isCached(true))

    expect(store.getState().settings.isCached).toBe(true)
  })

  it('saveSettings validation', () => {
    store.dispatch(action.saveSettings(settings))

    expect(store.getState().settings).toMatchObject(validatedSettings)
  })

  it('saveBuildList action', () => {
    store.dispatch(action.saveBuildList(list))

    expect(store.getState().history.buildList).toStrictEqual(list)
  })

  it('getSettings action', () => {
    mockAxios.get('/api/settings').then((json) => {
      store.dispatch(action.saveSettings(json.data))
      store.dispatch(action.isCached(true))
    })
    mockAxios.mockResponseFor({ url: '/api/settings', method: 'get' }, { data: settings })

    expect(mockAxios.get).toHaveBeenCalledWith('/api/settings')
    expect(store.getState().settings).toMatchObject(validatedSettings)
    expect(store.getState().settings.isCached).toBe(true)
  })

  it('getBuildList action', () => {
    mockAxios.get('/api/builds').then((json) => {
      store.dispatch(action.saveSettings(json.data))
      store.dispatch(action.isCached(true))
    })
    mockAxios.mockResponseFor({ url: '/api/builds', method: 'get' }, { data: list })

    expect(mockAxios.get).toHaveBeenCalledWith('/api/builds')
    expect(store.getState().history.buildList).toStrictEqual(list)
  })

  it('runBuild action', () => {
    const commitHash = '563db2c756a782e94c552ca86c50dfc16b558ab4'
    const data = { id: 'ef562817-4449-4043-afbf-68a90b3cdf7b', buildNumber: 2, status: 'Waiting' }

    mockAxios.post(`/api/builds/${commitHash}`).then((json) => {
      expect(json.data).toStrictEqual(data)
    })
    mockAxios.mockResponseFor({ url: `/api/builds/${commitHash}`, method: 'post' }, { data })

    expect(mockAxios.post).toHaveBeenCalledWith(`/api/builds/${commitHash}`)
  })

  it('postSettings action', () => {
    store.dispatch(action.isLoading(true))
    expect(store.getState().settings.isLoading).toBe(true)
    let res = null
    mockAxios.post('/api/settings').then((json) => {
      res = json.data
    })
    mockAxios.mockResponseFor({ url: '/api/settings', method: 'post' }, { data: { success: true } })

    expect(res.success).toBe(true)
    expect(mockAxios.post).toHaveBeenCalledWith('/api/settings')
  })
})
