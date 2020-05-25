import React, { useState } from 'react'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getBuildList } from '../../../store/actionCreators'
import { Card, Button } from '../../index'
import './List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

const mapDispatch = {
  getBuildList,
}
const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const List: React.FC<Props> = ({ getBuildList }) => {
  const history = useHistory()
  const buildList = useSelector((state: RootState) => state.history.buildList)
  const [showButton, setShowButton] = useState(true)
  const { locale } = window

  function handleClick(event: React.MouseEvent, { buildNumber, buildId }: { buildNumber: number; buildId: string }) {
    // getDetailsByBuildId(buildId)
    history.push({ pathname: `build/${buildNumber}`, state: buildId })
  }

  function handleShowMore() {
    let currentAmount = buildList.length || 10

    if (currentAmount >= buildList[0].buildNumber) {
      setShowButton(!showButton)
    }

    currentAmount += 25
    getBuildList(currentAmount)
  }

  return (
    <ul className={cnList()}>
      {buildList &&
        buildList.map((el) => {
          return (
            <li key={el.buildNumber} className={cnList('item')}>
              <Card options={el} onClick={handleClick} />
            </li>
          )
        })}
      <div className={cnList('controls')}>
        {showButton && (
          <Button className={{ size: 'm', view: 'control' }} onClick={handleShowMore}>
            {locale.Build.Button.ShowMore}
          </Button>
        )}
      </div>
    </ul>
  )
}

export default connector(List)
