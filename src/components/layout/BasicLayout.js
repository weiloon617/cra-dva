import React, { PureComponent } from 'react'
import { Switch, Route } from 'dva/router'
import { connect } from 'dva'

// Component
import NavBar from '../navbar'

// Utils
import { getRoutes } from '../../utils/util'

// Routes
import Main from '../../routes/Main/'

class BasicLayout extends PureComponent {
  render() {
    const { routerData, match, location } = this.props
    const isLandingPage = match.path === location.pathname
    return (
      <div>
        <NavBar />
        {isLandingPage && <Main />}
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
        </Switch>
      </div>
    )
  }
}

export default connect(({ main }) => ({
  main,
}))(BasicLayout)
