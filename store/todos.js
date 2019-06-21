import axios from '@/utils/axios'
import uuid from 'uuidv4'

export const state = () => ({
  todos: []
})

export const getters = {
  todosLength: ({ todos }) => todos.length
}

export const mutations = {
  addTodo(state, todo) {
    state.todos = [...state.todos, todo]
  }
}

export const actions = {
  async postTodo({ commit, state }, { text }) {
    const url = 'todos'
    const { data } = await axios.post(url, {
      text,
      id: uuid().slice(0, 8)
    })
    commit('addTodo', data)
  }
}
