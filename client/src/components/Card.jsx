import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import Moment from 'react-moment'
import 'moment/locale/ru'
import { IconBox, Icon } from '.'
import './scss/Card.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Card = ({ children, className, options }) => {
  const { buildNumber, commitMessage, commitHash, branchName, authorName, status, start, duration } = options
  // console.log(status, 'status')
  // const startDate = parseJSON(start) // local TZ
  // const durationFormatted = format(duration, 'h:m')
  // console.log(startDate)
  const cnCard = cn('card')(className)
  const cnText = cn('text')
  return (
    <div className="card">
      <div className="card__token">
        <IconBox textStyle={{ view: status.toLowerCase() }}>
          <Icon name={status.toLowerCase()} />
        </IconBox>
      </div>
      <div className="card__content">
        <div className="card__history list">
          <div className="card__status list__item">
            <div className={`card__number ${cnText({ size: '18-20', view: status.toLowerCase() })}`}>
              {`#${buildNumber}`}
            </div>
            <div className="card__message text text_size_15-20 text_view_truncate">{commitMessage}</div>
          </div>
          <div className="list__item meta meta_m-distribute_vertical">
            <div className="meta__item">
              <div className="icon-box">
                <div className="icon icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4 text text_view_ghost">
                  <div className="icon">
                    <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.2 4C3.2 4.27 3.2225 4.5375 3.265 4.8H0.3C0.135 4.8 0 4.665 0 4.5V3.5C0 3.335 0.135 3.2 0.3 3.2H3.265C3.2225 3.4625 3.2 3.73 3.2 4ZM15.7 3.2H12.735C12.78 3.4625 12.8 3.73 12.8 4C12.8 4.27 12.7775 4.5375 12.735 4.8H15.7C15.865 4.8 16 4.665 16 4.5V3.5C16 3.335 15.865 3.2 15.7 3.2ZM8 1.2C7.2525 1.2 6.55 1.4925 6.02 2.02C5.49 2.55 5.2 3.2525 5.2 4C5.2 4.7475 5.49 5.45 6.02 5.98C6.55 6.5075 7.2525 6.8 8 6.8C8.7475 6.8 9.45 6.5075 9.98 5.98C10.51 5.45 10.8 4.7475 10.8 4C10.8 3.2525 10.51 2.55 9.98 2.02C9.45 1.4925 8.7475 1.2 8 1.2ZM8 0C10.21 0 12 1.79 12 4C12 6.21 10.21 8 8 8C5.79 8 4 6.21 4 4C4 1.79 5.79 0 8 0Z" />
                    </svg>
                  </div>
                </div>
                <div className=" text text_size_13-16">
                  {branchName}
                  <a className="text text_view_ghost">{commitHash.slice(0, 7)}</a>
                </div>
              </div>
            </div>
            <div className="meta__item meta__item_indent-b_8">
              <div className="icon-box">
                <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4 text text_view_ghost">
                  <div className="icon icon_view_ghost">
                    <svg width="13" height="14" viewBox="0 0 13 14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.125 7C8.0582 7 9.625 5.4332 9.625 3.5C9.625 1.5668 8.0582 0 6.125 0C4.1918 0 2.625 1.5668 2.625 3.5C2.625 5.4332 4.1918 7 6.125 7ZM8.575 7.875H8.11836C7.51133 8.15391 6.83594 8.3125 6.125 8.3125C5.41406 8.3125 4.74141 8.15391 4.13164 7.875H3.675C1.64609 7.875 0 9.52109 0 11.55V12.6875C0 13.4121 0.587891 14 1.3125 14H10.9375C11.6621 14 12.25 13.4121 12.25 12.6875V11.55C12.25 9.52109 10.6039 7.875 8.575 7.875Z" />
                    </svg>
                  </div>
                </div>
                <div className="text text_size_13-16">{authorName}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card__meta card__meta_m-hr_top meta meta_distribute_vertical meta_m-distribute_horizontal text text_size_13-16 text_view_ghost">
          <div className="meta__item meta__item_indent-b_8">
            <div className="icon-box">
              <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
                <div className="icon">
                  <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.60806 9H3.36264C3.15714 9 2.98901 8.83125 2.98901 8.625V7.375C2.98901 7.16875 3.15714 7 3.36264 7H4.60806C4.81355 7 4.98169 7.16875 4.98169 7.375V8.625C4.98169 8.83125 4.81355 9 4.60806 9ZM7.9707 8.625V7.375C7.9707 7.16875 7.80256 7 7.59707 7H6.35165C6.14615 7 5.97802 7.16875 5.97802 7.375V8.625C5.97802 8.83125 6.14615 9 6.35165 9H7.59707C7.80256 9 7.9707 8.83125 7.9707 8.625ZM10.9597 8.625V7.375C10.9597 7.16875 10.7916 7 10.5861 7H9.34066C9.13517 7 8.96703 7.16875 8.96703 7.375V8.625C8.96703 8.83125 9.13517 9 9.34066 9H10.5861C10.7916 9 10.9597 8.83125 10.9597 8.625ZM7.9707 11.625V10.375C7.9707 10.1687 7.80256 10 7.59707 10H6.35165C6.14615 10 5.97802 10.1687 5.97802 10.375V11.625C5.97802 11.8313 6.14615 12 6.35165 12H7.59707C7.80256 12 7.9707 11.8313 7.9707 11.625ZM4.98169 11.625V10.375C4.98169 10.1687 4.81355 10 4.60806 10H3.36264C3.15714 10 2.98901 10.1687 2.98901 10.375V11.625C2.98901 11.8313 3.15714 12 3.36264 12H4.60806C4.81355 12 4.98169 11.8313 4.98169 11.625ZM10.9597 11.625V10.375C10.9597 10.1687 10.7916 10 10.5861 10H9.34066C9.13517 10 8.96703 10.1687 8.96703 10.375V11.625C8.96703 11.8313 9.13517 12 9.34066 12H10.5861C10.7916 12 10.9597 11.8313 10.9597 11.625ZM13.9487 3.5V14.5C13.9487 15.3281 13.2793 16 12.4542 16H1.49451C0.669414 16 0 15.3281 0 14.5V3.5C0 2.67188 0.669414 2 1.49451 2H2.98901V0.375C2.98901 0.16875 3.15714 0 3.36264 0H4.60806C4.81355 0 4.98169 0.16875 4.98169 0.375V2H8.96703V0.375C8.96703 0.16875 9.13517 0 9.34066 0H10.5861C10.7916 0 10.9597 0.16875 10.9597 0.375V2H12.4542C13.2793 2 13.9487 2.67188 13.9487 3.5ZM12.4542 14.3125V5H1.49451V14.3125C1.49451 14.4156 1.57857 14.5 1.68132 14.5H12.2674C12.3701 14.5 12.4542 14.4156 12.4542 14.3125Z" />
                  </svg>
                </div>
              </div>
              <div className="">
                <Moment format="D MMM, HH:mm" locale="ru" local>
                  {start}
                </Moment>
              </div>
            </div>
          </div>
          <div className="meta__item meta__item_indent-b_8">
            {duration && (
              <div className="icon-box">
                <div className="icon-box__icon icon-box__icon_size_m icon-box__icon_indent-r_4">
                  <div className="icon">
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.2788 5.75L12.9833 5.04375C13.1299 4.89687 13.1299 4.65937 12.9833 4.5125L12.4534 3.98125C12.3069 3.83438 12.07 3.83438 11.9235 3.98125L11.2782 4.62813C10.3087 3.76875 9.08365 3.19375 7.73076 3.04063V1.5H8.60359C8.80933 1.5 8.97766 1.33125 8.97766 1.125V0.375C8.97766 0.16875 8.80933 0 8.60359 0H5.36164C5.1559 0 4.98757 0.16875 4.98757 0.375V1.125C4.98757 1.33125 5.1559 1.5 5.36164 1.5H6.23447V3.04375C3.00499 3.41563 0.498718 6.1625 0.498718 9.5C0.498718 13.0906 3.40089 16 6.98262 16C10.5643 16 13.4665 13.0906 13.4665 9.5C13.4665 8.10312 13.027 6.80937 12.2788 5.75ZM6.98262 14.5C4.22696 14.5 1.995 12.2625 1.995 9.5C1.995 6.7375 4.22696 4.5 6.98262 4.5C9.73827 4.5 11.9702 6.7375 11.9702 9.5C11.9702 12.2625 9.73827 14.5 6.98262 14.5ZM7.35669 11H6.60855C6.40281 11 6.23447 10.8313 6.23447 10.625V6.375C6.23447 6.16875 6.40281 6 6.60855 6H7.35669C7.56243 6 7.73076 6.16875 7.73076 6.375V10.625C7.73076 10.8313 7.56243 11 7.35669 11Z" />
                    </svg>
                  </div>
                </div>
                <div className="text text_size_13-16 text_view_ghost">
                  <Moment duration={start} date={start + duration} locale="ru" local />
                </div>
              </div>
            )}
          </div>
        </div>
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

export default Card
