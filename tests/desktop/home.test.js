const { assert } = require('chai')

describe('Home', function () {
  it('screenshot test', async function () {
    return this.browser.url('http://localhost:3000/').assertView('home', 'body', {
      allowViewportOverflow: true,
      compositeImage: true,
      screenshotDelay: 100,
    })
  })
})
