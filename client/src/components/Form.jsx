// import React from 'react'
import React, { useState, Component } from 'react'
import PropTypes from 'prop-types'
import { withNaming } from '@bem-react/classname'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveSettings, getSettings, postSettings ,isLoading} from '../store/actionCreators'
import { useHistory } from 'react-router-dom'


import { Input, Button, LinkButton } from '.'
import './scss/Form.scss'

const cn = withNaming({ n: '', e: '__', m: '_' })
const cnForm = cn('form')

const options = [
  {
    label: 'Github repository',
    placeholder: 'username/repo-name',
    id: 'repoName',
    isRequired: true,
    vertical: true,
  },
  {
    label: 'Build command',
    placeholder: 'npm run build',
    id: 'buildCommand',
    isRequired: false,
    vertical: true,
  },
  {
    label: 'Main branch',
    placeholder: 'master',
    id: 'mainBranch',
    isRequired: false,
    vertical: true,
  },
  {
    label: 'Synchronize every',
    placeholder: '10',
    id: 'period',
    isRequired: false,
    vertical: false,
    text: true,
  },
]


const FormControls = (ctx) => {
  // const history = useHistory()
  // const [loading, setLoading] = useState(false)

  const handleSave = () => {
    ctx.props.isLoading(true)
    ctx.props.saveSettings({...ctx.state})
    ctx.props.postSettings({...ctx.state})

    // history.push('/')
    // return <Redirect to="/" />
  }

  return (
    <div className="form__controls">
      <Button className={{ size: 'm', view: 'action' }} onClick={handleSave} disabled={ctx.props.settings.isLoading}>Save</Button>
      <Button className={{ size: 'm', view: 'control' }} disabled={ctx.props.settings.isLoading}>Cancel</Button>
      {/* <LinkButton to="/" className={{ size: 'm', view: 'action' }}>Get</LinkButton> */}
    </div>
  )
}

const Inputs = (ctx) => {
  return options.map((el) => (
    <div key={el.id} className={cnForm('item', { 'indent-t': 'xl' })}>
      <Input options={el} change={ctx.handleChange} />
    </div>
  ))
}

class Form extends Component {
  state = {...this.props.settings}


  handleChange = (id, val) => {
    this.setState({[id]:val })
    // console.log(this.state)
  }

    render() {
    return (
      <form className={cnForm()}>
        <div className={cnForm('title')}>
          <div className="form__header text text_type_h2 text_size_15-20">Settings</div>
          <div className="form__subheader text text_type_h3 text_size_13-18 text_view_ghost">
            Configure repository connection and synchronization settings.
          </div>
        </div>
        <div className={cnForm('items')}>{Inputs(this)}</div>
        {FormControls(this)}
      </form>
    )
  }
}


const mapDispatchToProps = {
  saveSettings, getSettings, postSettings, isLoading
}
function mapStateToProps(state) {
  return {
    settings: state.settings
  }
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
}
Form.defaultProps = {
  children: '',
  className: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
