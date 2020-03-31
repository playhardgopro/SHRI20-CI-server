import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { runBuild } from '../store/actionCreators'
import { LinkButton, Text, Button, Modal } from '.'
import './scss/Header.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Header = ({ children, runBuild, settings, match, currentBuild, history, buildList }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const cnHeader = cn('header')
  const header = { style: {}, text: '' }
  const hiddenBtn = { settings: true, runBuild: true, home: true, rebuild: true }

  switch (match.path) {
    case '/settings':
      header.style = { type: 'h1', size: '24-28', view: 'ghost' }
      header.text = 'School CI Server'
      break
    case '/':
      hiddenBtn.settings = false
      header.style = { type: 'h1', size: '24-28', view: 'ghost' }
      header.text = 'School CI Server'
      break
    case '/history':
      hiddenBtn.runBuild = false
      hiddenBtn.settings = false
      header.style = { type: 'h1', size: '24-30', bold: true }
      header.text = settings.repoName
      break
    case '/build/:buildNumber':
      hiddenBtn.rebuild = false
      hiddenBtn.settings = false
      header.style = { type: 'h1', size: '24-30', bold: true }
      header.text = settings.repoName
      break
    default:
      header.style = { type: 'h1', size: '24-28', view: 'ghost' }
      header.text = 'School CI Server'
  }

  return (
    <div className={cnHeader()}>
      <div className={cnHeader('content', { distribute: 'between' })}>
        <div className={cnHeader('title')}>
          <Text className={header.style}>{header.text}</Text>
        </div>
        <div className={cnHeader('controls')}>
          <Button
            icon={{ name: 'rebuild', size: 's' }}
            onClick={() => {
              runBuild(buildList[0].commitHash).then((response) => {
                history.push(`/build/${response.buildNumber}`)
              })
            }}
            className={{ size: 's', distribute: 'center', view_control: true, hidden: hiddenBtn.rebuild }}
            hideText
          >
            Rebuild
          </Button>
          <Button
            icon={{ name: 'run', size: 's' }}
            onClick={() => {
              setIsModalShown(true)
            }}
            className={{ size: 's', distribute: 'center', view_control: true, hidden: hiddenBtn.runBuild }}
            hideText
          >
            Run Build
          </Button>
          <LinkButton
            icon={{ name: 'settings', size: 's' }}
            to="/settings"
            className={{ size: 's', distribute: 'center', view_control: true, hidden: hiddenBtn.settings }}
            hideText
          >
            Settings
          </LinkButton>
          <LinkButton
            icon={{ name: 'settings', size: 's' }}
            to="/"
            className={{ size: 's', distribute: 'center', view_control: true, hidden: hiddenBtn.home }}
            hideText
          >
            Home
          </LinkButton>

          {children}
        </div>
      </div>
      {isModalShown && (
        <Modal
          onSubmit={(e, inputValue) => {
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
    buildList: state.history.buildList,
    settings: state.settings,
    currentBuild: state.build,
  }
}

const mapDispatchToProps = {
  runBuild,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
