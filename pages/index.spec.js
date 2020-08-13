import { Wrapper, shallowMount, createLocalVue } from '@vue/test-utils'
import index from './index.vue'
import TodoDialog from '@/components/TodoDialog.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Wrapper.prototype.ref = function(id) {
  return this.find({ ref: id })
}

describe('TodoDialog', () => {
  const INDEX_BOX = 'index-box'
  const OPEN_DIALOG_BUTTON = 'open-dialog-button'

  let localVue
  let store
  let state
  let getters
  let actions
  let wrapper

  Vue.use(Vuetify)
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    state = {
      todos: [{ text: 'test', id: '1' }],
    }

    getters = {
      todosLength: jest.fn(),
    }

    actions = {
      getAllTodos: jest.fn(),
      postTodo: jest.fn(),
      deleteTodo: jest.fn(),
      putTodo: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        todos: {
          namespaced: true,
          state,
          getters,
          actions,
        },
      },
    })

    wrapper = shallowMount(index, {
      localVue,
      store,
      data: () => ({
        todoDialog: false,
        getLoading: false,
      }),
    })
  })

  it('should render index-box', () => {
    const indexBox = wrapper.findComponent({ ref: INDEX_BOX })
    expect(indexBox.exists()).toBe(true)
  })

  it('click on openDialogButton should open dialog', () => {
    expect(actions.getAllTodos).toHaveBeenCalled()
    const openDialogButton = wrapper.findComponent({ ref: OPEN_DIALOG_BUTTON })
    openDialogButton.trigger('click')
    expect(wrapper.vm.todoDialog).toBe(true)
  })

  it('tododialog emit save should call post todo ', async () => {
    const todoDialogBox = wrapper.findComponent(TodoDialog)
    todoDialogBox.vm.$emit('save')
    expect(actions.postTodo).toHaveBeenCalled()
  })
})
