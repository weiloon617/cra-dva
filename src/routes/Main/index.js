import React, { Component } from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'

class Main extends Component {
  render() {
    return (
      <DocumentTitle title="CRA DVA">
        <div>Main</div>
      </DocumentTitle>
    )
  }
}

export default connect(({ main }) => ({
  main,
}))(Main)
