import React from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { useHistory } from 'react-router-dom'
import { Button } from '.'
import './scss/Button.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })

const LinkButton = ({ children, className, to, disabled, icon, hideText }) => {
  const history = useHistory()
  function handleClick() {
    history.push(to)
  }
  return (
    <Button
      type="button"
      hideText={hideText}
      icon={icon}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </Button>

    // <button type="button" className={classes} onClick={handleClick} disabled={disabled}>
    //   {children}
    // </button>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
LinkButton.defaultProps = {
  children: '',
  className: {},
  disabled: false,
}

export default LinkButton
