import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import Button from './Button'
import Icon from './Icon'
// import './scss/Header.scss'
const cn = withNaming({ n: '', e: '__', m: '_' })

const Header = ({ children, className }) => {
  const classes = cn('header', 'content')(className)

  return (
    <div className="header">
      <div className={classes}>
        <div className="header__title">
          <div className="text text_type_h1 text_size_24-28 text_view_ghost">School CI Server</div>
        </div>
        <div className="header__controls">
          <Button className={{ size: 's', distribute: 'center', view_control: true }}>
            <Icon className={{ size: 's' }}>
              <svg width="12" height="12" viewbox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4658 7.44193L10.4352 6.84677C10.5392 6.28548 10.5392 5.70968 10.4352 5.14839L11.4658 4.55323C11.5844 4.48549 11.6376 4.34517 11.5989 4.21452C11.3303 3.35324 10.8731 2.57421 10.2755 1.92582C10.1836 1.82663 10.0336 1.80244 9.91745 1.87018L8.88681 2.46534C8.45374 2.09276 7.95536 1.80485 7.41585 1.61615V0.428247C7.41585 0.292763 7.32149 0.174216 7.18843 0.145183C6.30053 -0.0532029 5.39085 -0.0435256 4.5465 0.145183C4.41344 0.174216 4.31908 0.292763 4.31908 0.428247V1.61856C3.78199 1.80969 3.2836 2.0976 2.84812 2.46776L1.8199 1.8726C1.70135 1.80485 1.55377 1.82663 1.46184 1.92824C0.864258 2.57421 0.407002 3.35324 0.138454 4.21694C0.0973256 4.34759 0.152971 4.48791 0.271518 4.55565L1.30216 5.15081C1.19813 5.7121 1.19813 6.2879 1.30216 6.84919L0.271518 7.44435C0.152971 7.51209 0.0997449 7.65241 0.138454 7.78306C0.407002 8.64434 0.864258 9.42337 1.46184 10.0718C1.55377 10.171 1.70377 10.1951 1.8199 10.1274L2.85054 9.53224C3.2836 9.90482 3.78199 10.1927 4.3215 10.3814V11.5718C4.3215 11.7072 4.41586 11.8258 4.54892 11.8548C5.43682 12.0532 6.3465 12.0435 7.19085 11.8548C7.32391 11.8258 7.41827 11.7072 7.41827 11.5718V10.3814C7.95536 10.1903 8.45374 9.9024 8.88923 9.53224L9.91987 10.1274C10.0384 10.1951 10.186 10.1734 10.2779 10.0718C10.8755 9.42579 11.3328 8.64676 11.6013 7.78306C11.6376 7.64999 11.5844 7.50967 11.4658 7.44193ZM5.86747 7.93306C4.80053 7.93306 3.93199 7.06451 3.93199 5.99758C3.93199 4.93065 4.80053 4.0621 5.86747 4.0621C6.9344 4.0621 7.80294 4.93065 7.80294 5.99758C7.80294 7.06451 6.9344 7.93306 5.86747 7.93306Z" />
              </svg>
            </Icon>
            <div className="button__text decorator hide_mobile">Settings</div>
          </Button>
        </div>
      </div>
    </div>
  )
  // "header__content header__content_distribute_between"
}

export default Header