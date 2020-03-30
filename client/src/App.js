import React, { PureComponent } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveSettings, getSettings, getBuildList } from './store/actionCreators'
import { Home, Settings, History, Details } from './components'

class App extends PureComponent {
  componentWillMount() {
    this.props.getSettings()
    this.props.getBuildList()
  }

  render() {
    const { history } = this.props

    return (
      <Switch>
        <Route
          history={history}
          exact
          path="/"
          render={() => {
            return this.props.settings.isCached ? <Redirect to="/history" /> : <Home />
          }}
        />
        <Route olololist={{ qwerty: 'true' }} history={history} exact path="/settings" component={Settings} />
        <Route history={history} exact path="/history" component={History} />
        <Route history={history} exact path="/build/:buildNumber" component={Details} />
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
    historyPage: state.history,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
