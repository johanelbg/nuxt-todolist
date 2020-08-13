import { Wrapper, shallowMount } from '@vue/test-utils'
import TodoDialog from './TodoDialog.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Wrapper.prototype.ref = function(id) {
  return this.find({ ref: id })
}

describe('TodoDialog', () => {
  const TODO_DIALOG_BOX = 'todo-dialog-box'
  const SAVE_BUTTON = 'save-button'
  const CHIP_IMPORTANT = 'chip-important'
  const CHIP_LATER = 'chip-later'
  const INPUT = 'todo-dialog-input'

  Vue.use(Vuetify)
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TodoDialog, {
      propsData: {
        todoProps: {
          id: 1,
          text: 'test',
        },
        dialogProps: true,
        saveLoading: false,
      },
    })
  })

  it('should render todo-dialog-box', () => {
    const todoDialogBox = wrapper.findComponent({ ref: TODO_DIALOG_BOX })
    expect(todoDialogBox.exists()).toBe(true)
  })

  it('should emit save on click', () => {
    const saveButton = wrapper.findComponent({ ref: SAVE_BUTTON })
    saveButton.trigger('click')
    expect(wrapper.emitted().save).toBeTruthy()
  })

  it('chip important should call function handleTag and update props', async () => {
    const chipImportant = wrapper.findComponent({ ref: CHIP_IMPORTANT })
    await chipImportant.trigger('click')
    expect(wrapper.props().todoProps.text).toContain('#important')
  })

  it('chip later should call function handleTag and update props', async () => {
    const chipLater = wrapper.findComponent({ ref: CHIP_LATER })
    await chipLater.trigger('click')
    expect(wrapper.props().todoProps.text).toContain('#later')
  })

  it('save button should be disabled if input is empty', async () => {
    const input = wrapper.findComponent({ ref: INPUT })
    const saveButton = wrapper.findComponent({ ref: SAVE_BUTTON })
    input.element.value = ''
    await Vue.nextTick()
    expect(saveButton.attributes().disabled).toBeTruthy()
  })
})
