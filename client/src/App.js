import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveSettings, getSettings, getBuildList } from './store/actionCreators'
import { Home, Settings, History, Details } from './components'

class App extends Component {
  componentDidMount() {
    this.props.getSettings()
    this.props.getBuildList()
  }

  render() {
    const { history, settings } = this.props

    return (
      <Switch>
        <Route
          history={history}
          exact
          path="/"
          render={() => {
            return !settings.isCached ? <Redirect to="/history" /> : <Home />
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
