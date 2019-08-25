import React from 'react'

// Dva
import { connect } from 'dva'

// Styling
import './index.less'

const Main = ({ main }) => {
  return <div className="main-wrapper">{main.title}</div>
}

export default connect(({ main }) => ({
  main,
}))(Main)
