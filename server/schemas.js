const settings = {
  required: ['buildCommand', 'mainBranch', 'period', 'repoName'],
  type: 'object',
  properties: {
    repoName: {
      type: 'string',
    },
    buildCommand: {
      type: 'string',
    },
    mainBranch: {
      type: 'string',
    },
    period: {
      type: 'number',
    },
  },
  additionalProperties: false,
}
module.exports = {
  settings,
}
