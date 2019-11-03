<template>
    <div id="app">
        <span>{{count}}</span>
        <button @click="add">add</button>
        <header>
            <input type="checkbox" :checked="allDone" @change="allToggle(!allDone)">
            <input type="text" placeholder="输入你要做的事情" @keyup.enter="addTodo">
        </header>
        <section class="todo-list">
            <div v-for="todo in filterTodos" :key="todo.id" :class="{done:todo.done}">
                <input type="checkbox" :checked="todo.done" @change="toggle({todo,done:!todo.done})">
                <span>{{todo.text}}</span>
            </div>
        </section>
        <section>
            <br>
            <br>
            <span v-for="(val,key) in filters" :key="key" class="filters">
                <a :class="{active:currentFilter===key}"
                   :href="'#/'+ key"
                   @click="filterChange(key)"
                >{{key}}</a>
            </span>
            <span @click="clearCompleted">clear completed</span>
            <br>
            <span>{{activeTodos.length | pluralize('item')}} left</span>
        </section>
    </div>
</template>

<script>
  /*eslint-disable*/
  import { mapActions, mapState } from "vuex";

  export default {
    name: 'app',
    components: {},
    data () {
      return {
        count: 0,
        filters: {
          all: todo => todo,
          active: todo => !todo.done,
          completed: todo => todo.done
        },
        currentFilter: 'all'
      }
    },
    computed: {
      ...mapState({
        todos: state => state.todos
      }),
      allDone () {
        return this.todos.every(todo => todo.done)
      },
      filterTodos () {
        return this.todos.filter(this.filters[this.currentFilter])
      },
      activeTodos () {
        return this.todos.filter(todo => !todo.done)
      }
    },
    methods: {
      ...mapActions([
        'addTodo',
      ]),
      allToggle (allDone) {
        this.$store.dispatch('allToggle', allDone)
      },
      add () {
        this.count++
      },
      toggle ({todo, done}) {
        this.$store.dispatch('toggle', {todo, done})
      },
      filterChange (key) {
        this.currentFilter = key
      },
      clearCompleted () {
        this.$store.commit('clearCompleted')
      }
    },
    filters: {
      pluralize (n, w) {
        if (n === 0 || n === 1) {
          return n + ' ' + w
        } else if (n > 1) {
          return n + ' ' + w + 's'
        }
      }
    }
  }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .todo-list {
        .done {
            color: #cccccc;
        }
    }

    .filters {
        margin: 0 10px;

        &:hover {
            cursor: pointer;
        }

        .active {
            border: 1px solid #7f8c8d;
            padding: 4px;
        }
    }
</style>
