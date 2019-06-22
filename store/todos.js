import axios from '@/utils/axios'
import uuid from 'uuidv4'

export const state = () => ({
  todos: []
})

export const getters = {
  todosLength: ({ todos }) => todos.length
}

export const mutations = {
  getTodos(state, todos) {
    state.todos = [...todos]
  },
  addTodo(state, todo) {
    state.todos = [...state.todos, todo]
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter(todo => todo.id !== id)
  },
  updateTodo(state, todo) {
    state.todos = state.todos.map(item => (item.id === todo.id ? todo : item))
  }
}

export const actions = {
  async getAllTodos({ commit }) {
    const url = 'todos'
    const { data } = await axios.get(url)
    commit('getTodos', data)
  },

  async postTodo({ commit }, { text }) {
    if (!text || typeof text !== 'string')
      throw new Error(`text not a string: ${id}`)
    const url = 'todos'
    const { data } = await axios.post(url, {
      text,
      id: uuid().slice(0, 8)
    })
    commit('addTodo', data)
  },

  async deleteTodo({ commit }, id) {
    if (!id || typeof id !== 'string') throw new Error(`id not a string: ${id}`)
    const url = `todos/${id}`
    await axios.delete(url)
    commit('removeTodo', id)
  },

  async putTodo({ commit }, todo) {
    if (!Object.keys(todo).length || typeof todo !== 'object')
      throw new Error(`todo not a object: ${id}`)
    const { text, id } = todo
    const url = `todos/${id}`
    await axios.put(url, { text })
    commit('updateTodo', todo)
  }
}
