import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { IconBox, Icon } from '../../'
import './Card.scss'

const prettyMilliseconds = require('pretty-ms')

const cn = withNaming({ n: '', e: '__', m: '_' })

const CardMeta = ({ start, duration, status }) => {
  return (
    <div className="card__meta card__meta_m-hr_top meta meta_distribute_vertical meta_m-distribute_horizontal text text_size_13-16 text_view_ghost">
      <div className="meta__item meta__item_indent-b_8">
        <div className="icon-box">
          <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
            <Icon name="calendar" />
          </div>
          <div className="">
            <Moment format="D MMM, HH:mm" local>
              {start}
            </Moment>
          </div>
        </div>
      </div>
      <div className="meta__item meta__item_indent-b_8">
        <div className="icon-box">
          <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
            <Icon name="clock" />
          </div>
          <div className="text text_size_13-16 text_view_ghost">
            {duration && prettyMilliseconds(duration, { compact: true })}
            {!duration && status}
          </div>
        </div>
      </div>
    </div>
  )
}

const CardMeta2 = ({ start, duration, status }) => {
  return (
    <div className="list__item meta meta_hr_top text text_size_13-16 text_view_ghost">
      <div className="meta__item meta__item_indent-b_8">
        <div className="icon-box">
          <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
            <Icon name="calendar" />
          </div>
          <div className="icon-box__content">
            <Moment format="D MMM, HH:mm" local>
              {start}
            </Moment>
          </div>
        </div>
      </div>
      <div className="meta__item meta__item_indent-b_8">
        <div className="icon-box">
          <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
            <Icon name="clock" />
          </div>
          <div className="text text_size_13-16 text_view_ghost">
            {duration && prettyMilliseconds(duration, { compact: true })}
            {!duration && status}
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({ children, className, options, onClick, match }) => {
  const { id, buildNumber, commitMessage, commitHash, branchName, authorName, start, duration, status } = options
  let viewStatus = ''
  let cardMetaUnder = true
  if (status === 'Success') viewStatus = 'success'
  if (status === 'Waiting' || status === 'InProgress' || status === '') viewStatus = 'warning'
  if (status === 'Canceled' || status === 'Fail') viewStatus = 'error'

  switch (match.path) {
    case '/history':
      cardMetaUnder = false
      break
    default:
      cardMetaUnder = true
  }

  const cnCard = cn('card')
  const cnText = cn('text')
  return (
    <div onClick={onClick && ((e) => onClick(e, buildNumber, id))} className="card">
      <div className={cnCard('token')}>
        <IconBox textStyle={{ view: viewStatus }}>
          <Icon name={viewStatus} />
        </IconBox>
      </div>
      <div className={cnCard('content')}>
        <div className={cnCard('history', ['list'])}>
          <div className={cnCard('status', ['list__item'])}>
            <div
              className={`${cnCard('number')} ${cnText({ size: '18-20', view: viewStatus })}`}
            >{`#${buildNumber}`}</div>
            <div className="card__message text text_size_15-20 text_view_truncate">{commitMessage}</div>
          </div>
          <div className="list__item meta meta_m-distribute_vertical">
            <div className="meta__item">
              <div className="icon-box">
                <span className="icon icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4 text text_view_ghost">
                  <Icon name="commit" />
                </span>
                <div className="icon-box__content text_size_13-16">
                  <span className="text">{branchName}</span>
                  <span className="text text_view_ghost">{commitHash.slice(0, 7)}</span>
                </div>
              </div>
            </div>
            <div className="meta__item meta__item_indent-b_8">
              <div className="icon-box">
                <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4 text text_view_ghost">
                  <Icon name="user" className={{ view: 'ghost' }} />
                </div>
                <span className="text text_size_13-16">{authorName}</span>
              </div>
            </div>
          </div>
          {cardMetaUnder && CardMeta2({ duration, start, status })}
        </div>
        {!cardMetaUnder && CardMeta({ duration, start, status })}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Card.defaultProps = {
  children: '',
  className: {},
}

export default withRouter(connect()(Card))
