import React, { Component } from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'

// Styling
import './index.less'

class Main extends Component {
  render() {
    return (
      <DocumentTitle title="CRA DVA">
        <div className="main-wrapper">Main</div>
      </DocumentTitle>
    )
  }
}

export default connect(({ main }) => ({
  main,
}))(Main)
