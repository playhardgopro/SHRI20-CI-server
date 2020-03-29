import React, { PureComponent } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
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
        <Route
          state={this.state}
          history={history}
          exact
          path="/"
          render={(props) => {
            return this.props.settings.isCached ? <Redirect to="/history" /> : <Home />
          }}
        >
          {/* {this.props.settings.isCached && <Redirect to="/history" />}
          <Home /> */}
        </Route>
        <Route history={history} exact path="/settings" component={Settings} />
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
