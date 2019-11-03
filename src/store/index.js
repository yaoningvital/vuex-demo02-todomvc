/*eslint-disable*/

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem('todo-vuejs')) || [],
    // todos: [],
    currentId: 0
  },
  mutations,
  actions,
  plugins
})