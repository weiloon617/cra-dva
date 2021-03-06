import { createElement } from 'react'
import dynamic from 'dva/dynamic'
import pathToRegexp from 'path-to-regexp'

import { getMenuData } from './menu'

let routerDataCache

const modelNotExisted = (app, model) =>
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1)
  })

const dynamicWrapper = (app, models, component) => {
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        app.model(require(`../models/${model}`).default)
      }
    })
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      })
    }
  }

  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.js`)),
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return component().then(raw => {
        const Component = raw.default || raw
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          })
      })
    },
  })
}

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['main'], () =>
        import('../components/layout/BasicLayout'),
      ),
      title: 'Main',
    },
    '/login': {
      component: dynamicWrapper(app, [], () => import('../routes/Login')),
      title: 'Login',
    },
    '/register': {
      component: dynamicWrapper(app, [], () => import('../routes/SignUp')),
      title: 'Register',
    },
  }

  const menuData = getFlatMenuData(getMenuData())

  let routerData = {}

  Object.keys(routerConfig).forEach(path => {
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))

    let menuItem = {}

    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]

    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    }
    routerData[path] = router
  })
  return routerData
}
