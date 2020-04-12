module.exports = {
  sets: {
    desktop: {
      files: 'tests/desktop',
    },
  },
  // baseUrl: 'http://localhost:3000',
  // gridUrl: 'http://0.0.0.0:4444/wd/hub',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome', // this browser should be installed on your OS
      },
    },
  },
  plugins: {
    'html-reporter/hermione': {
      enabled: true,
      path: 'tests/hermione-reports',
      defaultView: 'all',
      baseHost: 'test.com',
      errorPatterns: [
        'Parameter .* must be a string',
        {
          name: 'Cannot read property of undefined',
          pattern: 'Cannot read property .* of undefined',
          hint: '<div>google it, i dont know how to fix it =(</div>',
        },
      ],
    },
  },
}
