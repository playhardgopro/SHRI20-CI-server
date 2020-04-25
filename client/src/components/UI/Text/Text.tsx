import * as React from 'react'
import { withNaming } from '@bem-react/classname'
import './Text.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
interface TextProps {
  className: {}
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  const cnText = cn('text')

  return <span className={cnText(className)}>{children}</span>
}

export default Text
