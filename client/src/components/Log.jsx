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
  const log = `"> shri-2020-task-1@1.0.0 build \n> webpack --mode=production \"--colors\"\n\nHash: \u001b[1me541e85eb5e88a853b17\u001b[39m\u001b[22m\nVersion: webpack \u001b[1m4.41.5\u001b[39m\u001b[22m\nTime: \u001b[1m1782\u001b[39m\u001b[22mms\nBuilt at: 2020-03-30 \u001b[1m0:39:32\u001b[39m\u001b[22m\n        \u001b[1mAsset\u001b[39m\u001b[22m      \u001b[1mSize\u001b[39m\u001b[22m  \u001b[1mChunks\u001b[39m\u001b[22m  \u001b[1m\u001b[39m\u001b[22m                 \u001b[1m\u001b[39m\u001b[22m\u001b[1mChunk Names\u001b[39m\u001b[22m\n    \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m  1.83 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m  7.03 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\n    \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m  20.5 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m  24.8 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\nEntrypoint \u001b[1mmain\u001b[39m\u001b[22m = \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m \u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m\n[0] \u001b[1m./src/js/utils.js\u001b[39m\u001b[22m 514 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[1] \u001b[1mmulti ./src/js/_index.js ./src/scss/index.scss\u001b[39m\u001b[22m 40 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[2] \u001b[1m./src/js/_index.js\u001b[39m\u001b[22m 89 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[3] \u001b[1m./src/js/onoffswitch.js\u001b[39m\u001b[22m 654 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[4] \u001b[1m./src/js/e-accordion.js\u001b[39m\u001b[22m 403 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[5] \u001b[1m./src/scss/index.scss\u001b[39m\u001b[22m 39 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n    + 1 hidden module\nChild \u001b[1mmini-css-extract-plugin node_modules/css-loader/dist/cjs.js??ref--5-1!node_modules/postcss-loader/src/index.js!node_modules/sass-loader/dist/cjs.js!src/scss/index.scss\u001b[39m\u001b[22m:\n    Entrypoint \u001b[1mmini-css-extract-plugin\u001b[39m\u001b[22m = \u001b[1m\u001b[32m*\u001b[39m\u001b[22m\n    [0] \u001b[1m./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss\u001b[39m\u001b[22m 20.7 KiB {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n        + 1 hidden module\n"`

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
