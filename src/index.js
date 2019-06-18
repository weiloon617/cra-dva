// import createHistory from 'history/createBrowserHistory'

// Dva
import dva from 'dva'
import createLoading from 'dva-loading'

// Styling
import './App.css'

const createHistory = require('history').createBrowserHistory

// create app
const app = dva({
  history: createHistory(),
  onError: error => {
    error.preventDefault()
  },
})

// loading
app.use(createLoading())

// models used by app
app.model(require('./models/main').default)

// route in app
app.router(require('./router').default)

app.start('#root')

export default app._store
