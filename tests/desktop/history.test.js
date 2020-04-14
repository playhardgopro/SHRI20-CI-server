const { assert } = require('chai')

describe('History', function () {
  it('list exists', function () {
    return this.browser
      .url('http://localhost:3000/history')
      .isExisting('.list')
      .then((exists) => {
        assert.ok(exists, 'Список билдов не появился')
      })
  })
  it('screenshot test', async function () {
    return this.browser.url('http://localhost:3000/history').assertView('history', 'body', {
      allowViewportOverflow: true,
      compositeImage: true,
      screenshotDelay: 100,
    })
  })
})
