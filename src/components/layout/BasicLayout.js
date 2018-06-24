import React, { PureComponent } from 'react'
import { Switch, Route } from 'dva/router'
import { connect } from 'dva'

import { getRoutes } from '../../utils/util'
import Main from '../../routes/Main/'

@connect(({ main }) => ({
  main,
}))
export default class BasicLayout extends PureComponent {
  render() {
    const { routerData, match, location } = this.props
    const isLandingPage = match.path === location.pathname
    return (
      <div>
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
