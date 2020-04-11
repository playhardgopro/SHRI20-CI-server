const { assert } = require('chai')

describe('github', function () {
  it('should find hermione', function () {
    return this.browser
      .url('https://github.com/gemini-testing/hermione')
      .getText('#readme h1')
      .then(function (title) {
        assert.equal(title, 'Hermione')
      })
  })
})

describe('react', function () {
  it('should find repoName input', function () {
    return this.browser
      .url('https://localhost:3000/settings')
      .getText('#repoName')
      .then(function (title) {
        assert.equal(title, 'Hermione')
      })
  })
})
