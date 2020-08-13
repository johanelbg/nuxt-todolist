import { createLocalVue } from '@vue/test-utils'
import { getters, mutations, actions } from './todos'
import Vuex from 'vuex'
import mockAxios from 'axios'

describe('todos module', () => {
  let state
  let localVue

  const todoItem = {
    id: '1',
    text: 'test',
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      todos: [],
    }
  })

  it('getters, todosLength', () => {
    state.todos = [todoItem]
    const result = getters.todosLength(state)
    expect(result).toStrictEqual(1)
  })

  it('mutations setTodos', () => {
    const todos = [todoItem]
    mutations.setTodos(state, todos)
    expect(state.todos).toStrictEqual(todos)
  })

  it('mutations addTodo', () => {
    mutations.addTodo(state, todoItem)
    expect(state.todos).toContain(todoItem)
  })

  it('mutations removeTodo', () => {
    state.todos = [todoItem]
    mutations.removeTodo(state, '1')
    expect(state.todos.length).toBe(0)
  })

  it('mutations updateTodo', () => {
    state.todos = [todoItem]
    const newTodo = { id: '1', text: 'updated' }
    mutations.updateTodo(state, newTodo)
    expect(state.todos[0]).toStrictEqual(newTodo)
  })

  it('actions getAllTodos', async () => {
    const mockData = []
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockData }),
    )
    const context = {
      commit: jest.fn(),
    }

    await actions.getAllTodos(context)
    expect(context.commit).toHaveBeenCalledWith('setTodos', mockData)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })

  it('actions postTodo', async () => {
    const mockData = {
      id: '1',
      text: 'text',
    }
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: mockData }),
    )
    const context = {
      commit: jest.fn(),
    }

    await actions.postTodo(context, mockData)
    expect(context.commit).toHaveBeenCalledWith('addTodo', mockData)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
  })

  it('actions putTodo', async () => {
    const mockData = {
      id: '1',
      text: 'text',
    }
    mockAxios.put.mockImplementationOnce(() => Promise.resolve())
    const context = {
      commit: jest.fn(),
    }

    await actions.putTodo(context, mockData)
    expect(context.commit).toHaveBeenCalledWith('updateTodo', mockData)
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
  })

  it('actions deleteTodo', async () => {
    const mockData = '1'

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve())
    const context = {
      commit: jest.fn(),
    }

    await actions.deleteTodo(context, mockData)
    expect(context.commit).toHaveBeenCalledWith('removeTodo', mockData)
    expect(mockAxios.delete).toHaveBeenCalledTimes(1)
  })
})
