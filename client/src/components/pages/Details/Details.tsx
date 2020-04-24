import React, { useEffect } from 'react'
import { connect, useSelector, ConnectedProps } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getBuildList } from '../../../store/actionCreators'
import { Footer, Header, Layout, Card, Log } from '../../index'

const mapDispatch = {
  getBuildList,
}
const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const Details: React.FC<Props> = ({ getBuildList }) => {
  const { buildNumber } = useParams()
  const history = useHistory()
  const buildList = useSelector((state: RootState) => state.history.buildList)

  useEffect(() => {
    getBuildList(buildList ? buildList.length : Number(buildNumber))
  }, [buildNumber])

  // NOTE: здесь захардкожено, надо подумать, как сделать лучше
  const options = buildList ? buildList.filter((el) => el.buildNumber === Number(buildNumber)) : []
  const filteredOptions = options.length ? options : null

  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        {/* <Grid className={grid}> */}
        <div className="list">
          <div className="list__item">
            {filteredOptions && (
              <Card
                options={filteredOptions[0]}
                onClick={() => {
                  history.push('/history')
                }}
              />
            )}
          </div>
        </div>

        <Log />
        {/* </Grid> */}
      </Layout>
      <Footer />
    </div>
  )
}

export default connector(Details)
