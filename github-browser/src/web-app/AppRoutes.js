import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import githubIssuList from 'web-app/apps/eagle-eye/githubIssues/githubIssueList.react'
import githubIssueDetails from 'web-app/apps/eagle-eye/githubIssues/githubIssueDetails.react'
class AppRoutes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path={'/issues'} component={githubIssuList} />
            <Route path={'/details'} component={githubIssueDetails}></Route>
            <Route path={'/'} component={githubIssuList} />
          </Switch>
        </Router>
      </div>
    )
  }
}

AppRoutes.displayName = 'AppRoutes'
export default AppRoutes
