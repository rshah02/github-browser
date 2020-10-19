import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import GithubIssueList from './githubIssueList.react.js'
import


class EagleEyeApp extends Component {
  _renderEagleEyeAppRoutes() {
    return (
      <EagleEyePage>
        <Router>
          // <Route path={'/issues/issueList'} component={git} />
          <Route path={'/eagle-eye/vulns'} component={EagleEyeVulns} />
          <Route path={'/eagle-eye/apps'} component={EagleEyeApps} />
        </Router>
      </EagleEyePage>
    )
  }

  render() {
    return <div>{this._renderEagleEyeAppRoutes()}</div>
  }
}

EagleEyeApp.displayName = 'EagleEyeApp'
export default EagleEyeApp
