import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getBuildList, getDetailsByBuildId } from '../../../store/actionCreators'
import { Card, Button } from '../..'
import './List.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnList = cn('list')

const List = ({ getDetailsByBuildId, getBuildList }) => {
  const history = useHistory()
  const buildList = useSelector((state) => state.history.buildList)
  const [showButton, setShowButton] = useState(false)

  function handleClick(event, { buildNumber, buildId }) {
    // getDetailsByBuildId(buildId)
    history.push({ pathname: `build/${buildNumber}`, state: buildId })
  }

  useEffect(() => {}, [showButton])

  function handleShowMore() {
    let currentAmount = buildList.length || 10

    if (currentAmount >= buildList[0].buildNumber) {
      setShowButton(false)
    }
    setShowButton(true)

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
            Show more
          </Button>
        )}
      </div>
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
List.defaultProps = {
  children: '',
  className: {},
}

const mapDispatchToProps = {
  getBuildList,
  getDetailsByBuildId,
}

export default connect(null, mapDispatchToProps)(List)
