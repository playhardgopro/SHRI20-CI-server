import React, { useEffect } from 'react'
import { withNaming } from '@bem-react/classname'
import './Log.scss'
import { useSelector } from 'react-redux'

import Convert from 'ansi-to-html'

const convert = new Convert({
  fg: '#000',
  bg: '#E6E6E6',
  newline: true,
  escapeXML: false,
  stream: false,
})

const cn = withNaming({ n: '', e: '__', m: '_' })

interface LogProps {
  className?: {}
}

const Log: React.FC<LogProps> = () => {
  const cnLog = cn('log')
  const { locale } = window
  const logText = useSelector((state: RootState) => state.build.logs) || locale.BuildDetails.Logs.WaitUntilLoading

  return (
    <div className={cnLog()}>
      <div className={cnLog('pre', { scroll: true })}>
        <pre className="pre">
          <div dangerouslySetInnerHTML={{ __html: convert.toHtml(logText) }} />
        </pre>
      </div>
    </div>
  )
}

export default Log
