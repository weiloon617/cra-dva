import React from 'react'
import DocumentTitle from 'react-document-title'

// Dva
import { Switch, Route } from 'dva/router'

// Utils
import { getRoutes } from '../../utils/util'

// Route
import Main from '../../routes/Main'

const BasicLayout = ({ routerData, match, location }) => {
  let isMainPage = null

  if (match.path === location.pathname) {
    isMainPage = <Main />
  }

  let currentRouteData = routerData[location.pathname]

  return (
    <DocumentTitle title={currentRouteData.title}>
      <div>
        {isMainPage}
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
    </DocumentTitle>
  )
}

export default BasicLayout
