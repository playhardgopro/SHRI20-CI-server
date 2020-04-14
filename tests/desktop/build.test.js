const { assert } = require('chai')

describe('Build', function () {
  it('screenshot test', async function () {
    return this.browser.url('http://localhost:3000/build/1').assertView('build', 'body', {
      allowViewportOverflow: true,
      compositeImage: true,
      screenshotDelay: 100,
    })
  })
})
