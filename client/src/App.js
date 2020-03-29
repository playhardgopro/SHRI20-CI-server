import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveSettings, getSettings, getBuildList } from './store/actionCreators'
import { Home, Settings, History, Details } from './components'

class App extends PureComponent {
  componentWillMount(props) {
    this.props.getSettings({ ...this.state })
    // this.props.getBuildList({ ...this.state })
  }

  render() {
    const { history } = this.props

    return (
      <Switch>
        <Route history={history} exact path="/">
          {this.props.settings.isCached && <Redirect to="/history" />}
          <Home />
        </Route>
        <Route history={history} exact path="/settings" component={Settings} />
        <Route history={history} exact path="/history" component={History} />
        {/* <Route history={history} exact path="/details" component={Details} /> */}
      </Switch>
    )
  }
}

const mapDispatchToProps = {
  saveSettings,
  getSettings,
  getBuildList,
}
function mapStateToProps(state) {
  return {
    settings: state.settings,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
