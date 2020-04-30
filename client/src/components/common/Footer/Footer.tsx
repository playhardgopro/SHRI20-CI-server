import * as React from 'react'
import { Link } from 'react-router-dom'
import { withNaming } from '@bem-react/classname'
import './Footer.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Footer = () => {
  const cnFooter = cn('footer')
  const cnText = cn('text')
  return (
    <div className={cnFooter()}>
      <div className={cnFooter('content')}>
        <div className={cnFooter('links')}>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>Support</div>
          </Link>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>Learning</div>
          </Link>
        </div>
        <div className={cnFooter('copyright')}>
          <a href="https://github.com/playhardgopro">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>&copy; 2020 Daniil Egortsev</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
