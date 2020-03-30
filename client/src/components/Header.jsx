import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { runBuild } from '../store/actionCreators'
import { LinkButton, Icon, Text, Button, Modal } from '.'
import './scss/Header.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Header = ({ children, className, page, runBuild, settings }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const cnHeader = cn('header')
  let headerStyle = {}
  let headerText = ''
  if (page === 'settings' || page === 'home') {
    headerStyle = { type: 'h1', size: '24-28', view: 'ghost' }
    headerText = 'School CI Server'
  } else if (page === 'history') {
    headerStyle = { type: 'h1', size: '24-30' }
    headerText = settings.repoName
  }

  return (
    <div className={cnHeader()}>
      <div className={cnHeader('content', { distribute: 'between' })}>
        <div className={cnHeader('title')}>
          <Text className={headerStyle}>{headerText}</Text>
        </div>
        <div className={cnHeader('controls')}>
          <LinkButton
            icon={{ name: 'settings', size: 's' }}
            to="/settings"
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
          <Button
            icon={{ name: 'run', size: 's' }}
            onClick={() => {
              setIsModalShown(true)
            }}
            className={{ size: 's', distribute: 'center', view_control: true }}
          >
            Run Build
          </Button>
          {children}
        </div>
      </div>
      {isModalShown && (
        <Modal
          onSubmit={(e, inputValue) => {
            console.log(inputValue)
            runBuild(inputValue)
            setIsModalShown(false)
          }}
          onCancel={() => setIsModalShown(false)}
        />
      )}
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

function mapStateToProps(state) {
  return {
    historyPage: state.history,
    settings: state.settings,
  }
}

const mapDispatchToProps = {
  runBuild,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
