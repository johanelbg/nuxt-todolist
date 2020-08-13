import { Wrapper, shallowMount } from '@vue/test-utils'
import UpperCard from './UpperCard.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Wrapper.prototype.ref = function(id) {
  return this.find({ ref: id })
}

describe('UpperCard', () => {
  const UPPER_CARD_BOX = 'upper-card-box'

  Vue.use(Vuetify)
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UpperCard)
  })

  it('should render upper-card-box', () => {
    const upperCardBox = wrapper.findComponent({ ref: UPPER_CARD_BOX })
    expect(upperCardBox.exists()).toBe(true)
  })

  it('if todoslenght < 1, taskText should be task', () => {
    wrapper = shallowMount(UpperCard, {
      propsData: { todosLength: 0 },
    })
    const taskBox = wrapper.findComponent({ ref: 'uppercard-tasktext' })
    expect(taskBox.text()).toMatch('Task')
  })

  it('if todoslenght > 1, taskText should be tasks', () => {
    wrapper = shallowMount(UpperCard, {
      propsData: { todosLength: 3 },
    })
    const taskBox = wrapper.findComponent({ ref: 'uppercard-tasktext' })
    expect(taskBox.text()).toMatch('Tasks')
  })
})
