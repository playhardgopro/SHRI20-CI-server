import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Log.scss'

const Convert = require('ansi-to-html')

const convert = new Convert({
  fg: '#FFF',
  bg: '#000',
  newline: false,
  escapeXML: false,
  stream: false,
})

const cn = withNaming({ n: '', e: '__', m: '_' })

const Log = ({ children, className }) => {
  const cnLog = cn('log')(className)
  const log = `npm WARN react-redux@7.2.0 requires a peer of redux@^2.0.0 || ^3.0.0 || ^4.0.0-0 but none is installed. You must install peer dependencies yourself.
  npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
  npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/fsevents):
  npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
  npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/webpack-dev-server/node_modules/fsevents):
  npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
  npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/watchpack/node_modules/fsevents):
  npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
  npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/jest-haste-map/node_modules/fsevents):
  npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.12: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
  
  + ansi-to-html@0.6.14
  added 2 packages from 13 contributors in 24.85s
  
  55 packages are looking for funding
    run 'npm fund' for details`

  console.log(convert.toHtml(log))

  return (
    <div className="log">
      <div className="log__pre log__pre_scroll">
        <pre className="pre">{convert.toHtml(log)}</pre>
      </div>
    </div>
  )
}

Log.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Log.defaultProps = {
  children: '',
  className: {},
}

export default Log
