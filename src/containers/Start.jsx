import React, {Component} from 'react'
import {connect} from 'react-redux'

import {push} from 'react-router-redux'
import {Link} from 'react-router'

import { Card, Col, Row, Button } from 'antd';

import {fetchTodosCount} from '../actions/todos'

class Start extends Component {

  componentDidMount(){
    if (!this.props.todos.all_count) {
      this.props.dispatch(fetchTodosCount())
    }
  }

  render() {
    return (
     <div style={{ background: '#ECECEC', padding: '20px' }}>
      <Row>
        <Col span="4" style={{'margin-left': '10px'}}>
          <Card title="Todolist" style={{ width: 300 }}>
            <Button type='ghost'><h2><Link to='/todos'>All {this.props.todos.all_count}</Link></h2></Button>
          </Card>
        </Col>
      </Row>
    </div>
    )
  }
}

// export default Start = connect()(Start)
export default Start = connect(store => ({
  todos: store.todos
}))(Start)
