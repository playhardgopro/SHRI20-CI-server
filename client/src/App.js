import React, { PureComponent } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveSettings, getSettings, getBuildList } from './store/actionCreators'
import { Home, Settings, History, Details } from './components'

class App extends PureComponent {
  componentDidMount() {
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
        <Route history={history} exact path="/settings">
          <Settings />
        </Route>
        <Route history={history} exact path="/history">
          <History />
        </Route>
        <Route history={history} exact path="/build/:buildNumber">
          <Details />
        </Route>
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
