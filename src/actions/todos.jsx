import {push} from 'react-router-redux'
import moment from 'moment'
import {message} from 'antd'

export function CreateTodo(data) {
  return function (dispatch, getState) {
    const url = 'https://todo.sites.mulder.kiev.ua/api/v1/todos'
    const todo = {comment: data.comment}
    if (data.date_end) { todo.date_end = moment(data.date_end).format('YYYY-MM-DD') }
    const content = {'todo': todo}
    fetch(url, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(content)
    })
    .then(response => response.json())
    .then(json => dispatch({ type:'add_todo_item', payload:{ ...json } }))
/*    .then(function(response) {
      if (response.status == '201') {
        dispatch({ type: 'add_todo_item', payload: { todo: response.json() }})
      } else if (/[50]/.test(response.status)) {
        message.error('Create todo '+data.comment+' failed')
      } 
    })*/
  }
}
//    .catch(message.error('Todo item create failed',3))

export function deleteTodo(data) {
  return function (dispatch, getState) {
    const url = 'https://todo.sites.mulder.kiev.ua/api/v1/todos/'+data.id
    fetch(url, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(function(response) {
      if (response.status == '204') {
        dispatch({ type: 'delete_todo_item', payload: { todo: data }})
      } else if (/[50]/.test(response.status)) {
        message.error('delete '+data.comment+' failed')
      }
    })
  }
}


export function fetchTodos() {
  return function (dispatch, getState) {
    const token = true
    var link = 'https://todo.sites.mulder.kiev.ua/api/v1/todos'

//    if (token) {
      fetch(link, {
        method: 'GET',
        credentials: 'include',
        headers: { 'auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(json => dispatch({
        type:'load_todos',
        payload:{
          ...json
        }
      }),
      )//.catch(alert('something is wrong'))
//    }
  }
}

export function fetchTodosCount () {
  return function (dispatch, getState) {
    const token = 'ok'
    var link = 'https://todo.sites.mulder.kiev.ua/api/v1/todos/count'

    if (token) {
      fetch(link, {
        method: 'GET',
        credentials: 'include',
        headers: { 'auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(json => dispatch({
        type:'load_todos_count',
        payload:{
          ...json
        }
      }),
      )//.catch(alert('something is wrong'))
    }
  }
}
