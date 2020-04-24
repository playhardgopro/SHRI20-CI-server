import React, { ReactChildren } from 'react'
import { withNaming } from '@bem-react/classname'
import './Grid.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

export interface GridProps {
  children: React.ReactNode
  className: {
    block: {
      'm-columns': number
      'col-gap': string
    }
    elem: {
      'm-col': number
    }
  }
}

const Grid: React.FC<GridProps> = ({ children, className }) => {
  const block = cn('grid')(className.block)
  const elem = cn('grid', 'fraction')(className.elem)

  return (
    <div className={block}>
      <div className={elem}>{children}</div>
    </div>
  )
}

export default Grid
