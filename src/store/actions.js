/*eslint-disable*/

export default {
  addTodo ({state, getters, commit, dispatch}, e) {
    let text = e.target.value
    if (text) {
      commit('addTodo', {
        text,
        done: false
      })
      e.target.value = ''
    }
  },
  allToggle ({state, getters, commit, dispatch}, allDone) {
    state.todos.forEach(todo => {
      // todo.done = allDone
      commit('setTodoDone', {todo, done: allDone})
    })
    
  },
  toggle ({state, getters, commit, dispatch}, {todo, done}) {
    commit('setTodoDone', {todo, done})
  }
}