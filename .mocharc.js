module.exports = {
  require: ['chai', '@babel/register'],
  ui: 'bdd',
  // ui: 'tdd',
  reporter: 'spec',
  growl: false,
  spec: './tests/mocha/**/*.test.js',
}
