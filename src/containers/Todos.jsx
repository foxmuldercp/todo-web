import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'

import {fetchTodos, deleteTodo} from '../actions/todos'

import NewTodo from './NewTodo'

import { LocaleProvider, Table, Icon, Button, Row, Col, Input, message } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import ruRU from 'antd/lib/locale-provider/ru_RU'

import './todos.css'

class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredTodos: [],
      todos: props.todos,
      filterDropdownVisible: false,
      searchText: '',
    }
  }

  componentDidMount(){
//    if (this.props.todos.length == 0) {
      this.props.dispatch(fetchTodos())
//    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {todos: nextProps.todos.todos}
    this.setState(newState)
  }

  shortDate(data) {
    return (data) ? moment(data).format('DD MMM YYYY') : ''
  }

  done(text,record) {
    return <span>{(record.done) ? <Icon type="check-circle-o" /> : <Icon type="close-circle-o" /> }</span>
  }

  onInputChange(e) {
    this.setState({ searchText: e.target.value })
  }

  clearSearch() {
    this.setState({ filteredTodos: [], filterDropdownVisible: false, searchText: '' })
  }

  deleteTodo(record) { this.props.dispatch(deleteTodo(record)) }

  todoStatusFilter(value, record) {
  var filtered = false
    record.status.forEach(item => {
      if (item == value) {
        filtered = true
      }
    })
    return filtered
  }

  onSearch() {
    const { searchText } = this.state
    const reg = new RegExp(searchText, 'gi')
    const filtered = this.state.todos.map((record) => {
      const match = record.comment.match(reg)
      if (!match) {
        return null
      }
      return {
        ...record,
        name: (
          <span>
            {record.comment.split(reg).map((text, i) => (
              i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
            ))}
          </span>
        ),
      }
    }).filter(record => !!record)

    if (filtered.length == 0) {
      message.info('No todos found by this criteria. Show all')
      this.setState({ filterDropdownVisible: false, searchText: '' })
    } else {
      this.setState({ filterDropdownVisible: false, searchText: '', filteredTodos: filtered })
    }
  }
// {"id":2,"done":false,"comment":"My First Todo","date_end":null,"priority":null,"created_at":"2017-01-04T17:55:09.593Z","updated_at":"2017-01-04T17:55:09.593Z"}
  render() {
    const columns = [
      {
        title: 'Done',
        dataIndex: 'done',
        key: 'done',
        render: (text,record) => this.done(text,record),
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        sorter: (a, b) => {
          if(a.comment < b.comment) return -1
          if(a.comment > b.comment) return 1
          return 0
        },
        filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            placeholder="Search comment"
            value={this.state.searchText}
            onChange={::this.onInputChange}
            onPressEnter={::this.onSearch}
          />
          <Button shape="circle" icon="search" onClick={::this.onSearch} type="primary" />
          <Button shape="circle" icon="close"  onClick={::this.clearSearch} />
        </div>
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      },
      {
        title: 'End',
        dataIndex: 'date_end',
        key: 'date_end',
        render: (text)=> this.shortDate(text),
        sorter: (a, b) => {
          if ( !moment(a.date_end).isValid()           ) return -1
          if ( !moment(b.date_end).isValid()           ) return 1
          if ( moment(a.date_end).isBefore(b.date_end) ) return -1
          if ( moment(a.date_end).isSame(b.date_end)   ) return 0
          if ( moment(a.date_end).isAfter(b.date_end)  ) return 1
        },
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text,record)=> <Button onClick={() => this.deleteTodo(record)}>Delete</Button>,
      }
    ]

    const items = (this.state.filteredTodos.length > 0) ? this.state.filteredTodos : this.state.todos

    return (
      <Row type='flex'> 
        <Col xs={{span:22, offset:1}}>
          <NewTodo dispatch={this.props.dispatch} />
        </Col>
        <Col xs={{span:22, offset:1}}>
          <LocaleProvider locale={enUS}>
            {(items.length > 0) ?
               <Table rowKey={record => record.id} dataSource={items} columns={columns}
               />
            :
              <Table rowKey={record => record.id} dataSource={[]} columns={columns}
                loading='true'
              />
            }
          </LocaleProvider>
        </Col>
      </Row>
    )
  }
}

export default Todos = connect(store => ({
  todos: store.todos
}))(Todos)
