import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { LinkButton, Icon, Text } from '.'
import './scss/Header.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Header = ({ children, className }) => {
  const cnHeader = cn('header')
  const cnHeaderContent = cn('header', 'content')
  const cnHeaderTitle = cn('header', 'title')

  return (
    <div className={cnHeader()}>
      <div className={cnHeader('content', { distribute: 'between' })}>
        <div className={cnHeader('title')}>
          <Text className={{ type: 'h1', size: '24-28', view: 'ghost' }}>School CI Server</Text>
        </div>
        <div className={cnHeader('controls')}>
          <LinkButton
            icon={{ name: 'settings', size: 's' }}
            to="./settings"
            className={{ size: 's', distribute: 'center', view_control: true }}
          >
            Settings
          </LinkButton>
          <LinkButton
            icon={{ name: 'settings', size: 's' }}
            to="/"
            className={{ size: 's', distribute: 'center', view_control: true }}
          >
            Home
          </LinkButton>
          {children}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.string || PropTypes.bool),
}
Header.defaultProps = {
  children: '',
  className: {},
}

export default Header
