export const initialTodos = {
  todos: [],
}

export default function fetchTodos(state=initialTodos, action){
  var items
  var item
  var newtodos
  var index
  var newstate
  switch (action.type){

  case 'load_todos':
    items = action.payload.todos
    return {
      ...state,
      todos: items,
      all_count: action.payload.meta.count
    }

  case 'load_todos_count':
    items = action.payload.count
    return {
      ...state,
      all_count: items
    }

  case 'add_todo_item':
    item = action.payload.todo
    items = state.todos
    items.push(item)
    newstate = {...state, todos: items, all_count: items.length}
    return newstate


  case 'update_todo_item':
    item = action.payload.todo
    newtodos = state.todos
    index = newtodos.findIndex(obj => obj.id == item.id)
    newtodos[index] = item
    newstate = {...state, todos: newtodos}
    return newstate

  case 'delete_todo_item':
    item = action.payload.todo
    newtodos = state.todos
    index = newtodos.findIndex(obj => obj.id == item.id)
    console.log('before delete ', index, newtodos)
    if (index > -1) {
      newtodos.splice(index, 1)
    }
    console.log('after: ', newtodos)
    newstate = {...state, todos: newtodos, all_count: newtodos.length}
    return newstate

    return {
      ...state,
      todos: items,
      order_field: order_field
    }

  default:
    return state
  }
}
