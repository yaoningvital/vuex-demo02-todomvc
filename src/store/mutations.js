export default {
  addTodo (state, {text, done}) {
    state.todos.push({
      id: state.currentId++,
      text,
      done
    })
  },
  setTodoDone (state, {todo, done}) {
    todo.done = done
  },
  clearCompleted (state) {
    let newTodos = []
    state.todos.forEach(todo => {
      if (!todo.done) {
        newTodos.push(todo)
      }
    })
    state.todos = newTodos
  }
}