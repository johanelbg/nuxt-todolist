import { Wrapper, shallowMount } from '@vue/test-utils'
import TodoItem from './TodoItem.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Wrapper.prototype.ref = function(id) {
  return this.find({ ref: id })
}

describe('TodoItem', () => {
  const TODO_ITEM_BOX = 'todo-item-box'
  const DELETE_BUTTON = 'delete-button'
  const UPDATE_BUTTON = 'update-button'

  Vue.use(Vuetify)
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todoItem: {
          id: 1,
          text: 'test #important',
        },
        deleteLoading: false,
      },
      data: () => ({
        fab: true,
      }),
    })
  })

  it('should render todo-item-box', () => {
    const todoItemBox = wrapper.findComponent({ ref: TODO_ITEM_BOX })
    expect(todoItemBox.exists()).toBe(true)
  })

  it('should emit update on click', () => {
    const updateItemButton = wrapper.findComponent({ ref: UPDATE_BUTTON })
    updateItemButton.trigger('click')
    expect(wrapper.emitted().update).toBeTruthy()
    expect(wrapper.emitted().update[0]).toEqual([wrapper.props('todoItem')])
  })

  it('should emit delete on click', () => {
    const deleteItemButton = wrapper.findComponent({ ref: DELETE_BUTTON })
    deleteItemButton.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    expect(wrapper.emitted().delete[0]).toEqual([wrapper.props().todoItem.id])
  })
})
