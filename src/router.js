import React from 'react'
import pathToRegexp from 'path-to-regexp'
import {routerRedux, Route, Switch} from 'dva/router'
import {getRouterData} from './common/router'

const {ConnectedRouter} = routerRedux

function RouterConfig({history, app}) {
    const routerData = getRouterData(app)
    // const noMatch = routerData['/404'].component
    const BasicLayout = routerData['/'].component
    const {pathname} = history.location

    // if (pathname === '/logout') {
    //     app._store.dispatch({type: 'login/logout'})
    // }

    // const RouteExist = Object.keys(routerData).some(path => pathToRegexp(path).exec(pathname))

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/*{!RouteExist && <Route path={pathname} component={noMatch}/>}*/}
                <Route path="/" component={BasicLayout}/>
            </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig