import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Text, Button } from '.'
import './scss/Layout.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const Layout = ({ children, className }) => {
  const classes = cn('layout', 'container')(className)
  return (
    <div className={classes}>
      <div className="grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_4">
        <div className="grid__fraction grid__fraction_m-col_4 grid__fraction_s-col_4 grid__fraction_m-offset_4">
          <div className="rep-connection">
            <div className="rep-connection__logo">
              <svg width="124" height="124" viewbox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M54.2526 23.2719V35.0895L61.446 42.2818C59.799 33.8545 62.2937 25.2577 68.3486 19.2036C73.2653 14.2877 79.7805 11.6481 86.5136 11.6481H86.8042L72.902 25.4999L76.5592 47.4399L98.5025 51.0966L112.38 37.2206C112.453 44.0738 109.813 50.6607 104.824 55.6493C102.571 57.9014 99.9314 59.6207 97.1219 60.88C97.5579 61.2675 98.0665 61.5823 98.4782 61.9939L105.914 69.4284C108.457 67.9027 110.879 66.0623 113.034 63.8828C122.262 54.6564 126.041 41.0468 122.892 28.3816C122.165 25.4272 119.889 23.1024 116.982 22.2791C114.027 21.4557 110.879 22.3033 108.747 24.4585L94.5304 38.6494L86.6831 37.3417L85.3753 29.4956L99.5681 15.3048C101.724 13.1495 102.547 10.0014 101.724 7.07118C100.924 4.141 98.5751 1.86466 95.6203 1.13817C82.7353 -2.05839 69.487 1.6225 60.1139 10.97C57.6434 13.4401 55.6332 16.225 53.9862 19.1794L54.2526 19.3731V23.2719ZM25.6731 109.942C22.573 113.042 17.1235 113.042 14.0233 109.942C12.4733 108.393 11.6013 106.31 11.6013 104.13C11.6013 101.927 12.449 99.8684 14.0233 98.3185L46.5749 65.7717L38.3644 57.5623L5.81278 90.085C2.05869 93.8385 0 98.8271 0 104.13C0 109.434 2.05869 114.422 5.81278 118.176C9.56687 121.929 14.5562 123.988 19.8603 123.988C25.1645 123.988 30.1538 121.929 33.9079 118.176L58.3458 93.7416C55.9965 89.9154 54.6644 85.5565 54.5433 81.1249L25.6731 109.942ZM121.366 95.8242L93.0045 67.4669C87.4097 61.8729 79.0539 60.7831 72.3207 64.1008L46.5023 38.2861V23.2477L15.5008 0L0 15.4985L23.2511 46.4955H38.2917L64.1102 72.3101C60.8162 79.0423 61.8819 87.3969 67.4767 92.9909L95.8383 121.348C99.3744 124.884 105.09 124.884 108.602 121.348L121.366 108.586C124.878 105.051 124.878 99.3356 121.366 95.8242Z"
                  fill="black"
                  fillOpacity="0.1"
                />
              </svg>
            </div>
            <div className="rep-connection__message">
              <Text className={{ size: '13-16', center: true }}>
                Configure repository connection and synchronization settings
              </Text>
            </div>
            <div className="rep-connection__controls">
              <Button className={{ size: 'm', view: 'action' }}>
                <div className="button__text">Open Settings</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node || PropTypes.string,
  className: PropTypes.string,
}
Layout.defaultProps = {
  children: '',
  className: '',
}

export default Layout
