import React from 'react'

// Dva
import { routerRedux, Route, Switch } from 'dva/router'

// Router
import { getRouterData } from './common/router'

const { ConnectedRouter } = routerRedux

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const BasicLayout = routerData['/'].component

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={BasicLayout} />
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig
