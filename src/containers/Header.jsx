import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Link} from 'react-router'

import { Row, Col, Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: '/',
    }
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    })
  }

  render() {
    const current_url = this.props.url
    return (<Row>
    <Col span={8}>
      <Menu
        selectedKeys={[current_url]}
        mode='horizontal'
      >
        <Menu.Item key='/'>
          <Link to='/'><Icon type='home' />Home</Link>
        </Menu.Item>
        <Menu.Item key='/todos'>
          <Link to='/todos'>Todos</Link>
        </Menu.Item>
      </Menu>
    </Col>
  </Row>
  )}
}

export default Header = connect()(Header)
