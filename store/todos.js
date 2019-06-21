import axios from '@/utils/axios'

export const state = () => ({
  todos: []
})

export const getters = {
  todosLength: ({ todos }) => todos.length
}

export const mutations = {}

export const actions = {
  postTodo(state, { text }) {}
}
