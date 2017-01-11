import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Header from './Header'

class HostPage extends Component {
  render() {
    const {children, dispatch, location} = this.props
    return <div>
        <Header url={location.pathname} />
        {children}
      </div>
  }
}

export default HostPage = connect()(HostPage)
