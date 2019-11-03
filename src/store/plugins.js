const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('todo-vuejs', JSON.stringify(state.todos))
  })
}

export default [localStoragePlugin]