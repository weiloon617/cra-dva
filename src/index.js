import '@babel/polyfill'
import 'url-polyfill'
import createHistory from 'history/createBrowserHistory'

import dva from 'dva'
import createLoading from 'dva-loading'

const app = dva({
  history: createHistory(),
  onError: error => {
    error.preventDefault()
  },
})

app.use(createLoading())

app.model(require('./models/main').default)

app.router(require('./router').default)

app.start('#root')

export default app._store
