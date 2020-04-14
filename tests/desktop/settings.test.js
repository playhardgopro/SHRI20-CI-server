const { assert } = require('chai')

describe('Settings', function () {
  it('input repoName exists', function () {
    return this.browser
      .url('http://localhost:3000/settings')
      .isExisting('#repoName')
      .then((exists) => {
        assert.ok(exists, 'Инпут не появился')
      })
  })
  it('input mainBranch exists', function () {
    return this.browser
      .url('http://localhost:3000/settings')
      .isExisting('#mainBranch')
      .then((exists) => {
        assert.ok(exists, 'Инпут не появился')
      })
  })
  it('input buildCommand exists', function () {
    return this.browser
      .url('http://localhost:3000/settings')
      .isExisting('#buildCommand')
      .then((exists) => {
        assert.ok(exists, 'Инпут не появился')
      })
  })
  it('input period exists', function () {
    return this.browser
      .url('http://localhost:3000/settings')
      .isExisting('#period')
      .then((exists) => {
        assert.ok(exists, 'Инпут не появился')
      })
  })
  it('screenshot test', async function () {
    return this.browser.url('http://localhost:3000/settings').assertView('settings', 'body', {
      allowViewportOverflow: true,
      compositeImage: true,
      screenshotDelay: 100,
    })
  })
})
