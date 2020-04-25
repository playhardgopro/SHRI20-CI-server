import React, { useState } from 'react'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector, useDispatch, ConnectedProps } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { runBuild } from '../../../store/actionCreators'
import { Text, Button, Modal } from '../../index'
import store from '../../../store/index'
import './Header.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const mapDispatch = {
  runBuild,
}
const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & HeaderProps
interface HeaderProps {
  className: { distribute: string }
  // runBuild(commitHash: string): Promise<BuildRequestResultModel>
}

const Header: React.FC<Props> = ({ children, runBuild, className }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const buildList = useSelector((state: RootState) => state.history.buildList)
  const settings = useSelector((state: RootState) => state.settings)
  // const useThunkDispatch = () => useDispatch<typeof store.dispatch>()
  // const thunkDispatch = useThunkDispatch()
  const cnHeader = cn('header')
  const header = { style: {}, text: '' }
  const hiddenBtn = { settings: true, runBuild: true, rebuild: true }
  const match = useRouteMatch()
  const history = useHistory()

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
      header.text = settings.repoName || 'username/reponame'
      break
    case '/build/:buildNumber':
      hiddenBtn.rebuild = false
      hiddenBtn.settings = false
      header.style = { type: 'h1', size: '24-30', bold: true }
      header.text = settings.repoName || 'username/reponame'
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
            className={{ size: 's', distribute: 'center', view: 'control', hidden: hiddenBtn.rebuild }}
            hideText
          >
            Rebuild
          </Button>
          <Button
            icon={{ name: 'run', size: 's' }}
            onClick={() => {
              setIsModalShown(true)
            }}
            className={{ size: 's', distribute: 'center', view: 'control', hidden: hiddenBtn.runBuild }}
            hideText
          >
            Run Build
          </Button>
          <Button
            icon={{ name: 'settings', size: 's' }}
            onClick={() => {
              history.push('/settings')
            }}
            className={{ size: 's', distribute: 'center', view: 'control', hidden: hiddenBtn.settings }}
            hideText
          >
            Settings
          </Button>
          {children}
        </div>
      </div>
      {isModalShown && (
        <Modal
          onSubmit={(commitHash) => {
            runBuild(commitHash).then((response) => {
              history.push(`/build/${response.buildNumber}`)
            })
            setIsModalShown(false)
          }}
          onCancel={() => setIsModalShown(false)}
        />
      )}
    </div>
  )
}

export default connector(Header)
