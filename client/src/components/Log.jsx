import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import './scss/Log.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Log = ({ children, className }) => {
  const log = cn('log')(className)
  return (
    <div className="log">
      <div className="log__pre log__pre_scroll">
        <pre className="pre">{`
Starting type checking and linting service...
Using 1 worker with 2048MB memory limit
Hash: d54ed20309f352b3bda76cbbb6d272ed6afde438bd7a265eb08db3624c32dfc883a8c379c67f4de6
Version: webpack 4.41.6
Child
    Hash: d54ed20309f352b3bda7
    Time: 40364ms
    Built at: 2020-02-23 16:04:54
                                     Asset      Size  Chunks             Chunk Names
                       0.bundle.static.css  1.31 MiB       0  [emitted]  vendors~main
                        0.bundle.static.js  10.3 MiB       0  [emitted]  vendors~main
                         bundle.static.css  48.6 KiB       1  [emitted]  main
                          bundle.static.js   613 KiB       1  [emitted]  main
             static/media/Cat.afa2191f.svg  9.83 KiB          [emitted]  
    static/media/illustration.a17c1b18.svg  14.8 KiB          [emitted]  
         static/media/picture.eef6f3b8.svg  16.2 KiB          [emitted]  
    Entrypoint main = 0.bundle.static.css 0.bundle.static.js bundle.static.css bundle.static.js
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
    [./src/account/actions/index.ts] 2.46 KiB {1} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {1} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {1} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {1} [built]
    [./src/account/epics/index.ts] 328 bytes {1} [built]
    [./src/account/epics/pageData.ts] 834 bytes {1} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {1} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {1} [built]
    [./src/account/index.tsx] 561 bytes {1} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {1} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {1} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {1} [built]
    [./src/account/store.ts] 1.05 KiB {1} [built]
        + 1864 hidden modules
Child
    Hash: 6cbbb6d272ed6afde438
    Time: 32877ms
    Built at: 2020-02-23 16:04:47
        Asset      Size  Chunks             Chunk Names
    server.js  6.34 MiB    main  [emitted]  main
    Entrypoint main = server.js
    [./src/account/actions/index.ts] 2.46 KiB {main} [built]
    [./src/account/api/lib/models/index.ts] 2.17 KiB {main} [built]
    [./src/account/api/lib/models/mappers.ts] 21 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {main} [built]
    [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {main} [built]
    [./src/account/epics/index.ts] 328 bytes {main} [built]
    [./src/account/epics/pageData.ts] 834 bytes {main} [built]
    [./src/account/epics/personalPage.ts] 2.29 KiB {main} [built]
    [./src/account/epics/registrationForm.ts] 910 bytes {main} [built]
    [./src/account/mappers/index.ts] 2.18 KiB {main} [built]
    [./src/account/reducers/githubRepos.ts] 837 bytes {main} [built]
    [./src/account/reducers/index.ts] 1.83 KiB {main} [built]
    [./src/account/reducers/serverError.ts] 526 bytes {main} [built]
    [./src/account/server.tsx] 1.62 KiB {main} [built]
    [./src/account/store.ts] 1.05 KiB {main} [built]
        + 1484 hidden modules                                  `}</pre>
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
