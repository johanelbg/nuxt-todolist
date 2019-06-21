export const state = () => ({
  todos: []
})

export const getters = {
  todosLength: ({ todos }) => todos.length
}
