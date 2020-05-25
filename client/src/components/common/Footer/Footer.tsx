import React, { useCallback, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { withNaming } from '@bem-react/classname'
import './Footer.scss'

import { SAVE_LOCALE } from '../../../store/types'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Footer: React.FC = () => {
  const cnFooter = cn('footer')
  const cnText = cn('text')
  const dispatch = useDispatch()
  const currentLocale = useSelector((state: RootState) => state.locale)
  const { locale } = window

  const onChangeLocale = useCallback(
    (e: SyntheticEvent) => {
      switch (currentLocale) {
        case 'ru':
          dispatch({ type: SAVE_LOCALE, payload: 'en' })
          break
        case 'en':
          dispatch({ type: SAVE_LOCALE, payload: 'ru' })
          break
        default:
          dispatch({ type: SAVE_LOCALE, payload: 'en' })
      }
      e.preventDefault()
    },
    [currentLocale]
  )

  return (
    <div className={cnFooter()}>
      <div className={cnFooter('content')}>
        <div className={cnFooter('links')}>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>{locale.Footer.Support}</div>
          </Link>
          <Link to="#">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>{locale.Footer.Learning}</div>
          </Link>
          <Link to="#" onClick={onChangeLocale}>
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>{locale.Footer.Locale}</div>
          </Link>
        </div>
        <div className={cnFooter('copyright')}>
          <a href="https://github.com/playhardgopro">
            <div className={cnText({ size: '13-18', view: 'ghost', type: 'link' })}>{locale.Footer.Copyright}</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
