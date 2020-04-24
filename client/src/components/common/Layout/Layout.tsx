import * as React from 'react'
import { withNaming } from '@bem-react/classname'
import './Layout.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

interface LayoutProps {
  className: { align: string; size?: string; hero?: boolean }
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const classes = cn('layout', 'container')(className)
  return <div className={classes}>{children}</div>
}

export default Layout
