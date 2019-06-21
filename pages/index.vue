<template>
  <v-layout column justify-center align-center full-width fill-height>
    <v-card class="card-box pa-3">
      <v-layout column>
        <UpperCard/>
      </v-layout>
      <div>
        <v-divider class="mt-3"/>
        <v-btn @click="openDialog" class="add-button" color="accent" depressed fab>
          <v-icon>add</v-icon>
        </v-btn>
      </div>
    </v-card>
    <TodoDialog :dialogProps.sync="todoDialog" :todoProps.sync="todo" @save="handleSave"/>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

const initialState = () => ({
  text: '',
  id: ''
})

export default {
  components: {
    UpperCard: () => import('@/components/UpperCard'),
    TodoDialog: () => import('@/components/TodoDialog')
  },

  data: () => ({
    todoDialog: false,
    todo: initialState()
  }),

  methods: {
    ...mapActions('todos', ['postTodo']),
    openDialog() {
      this.todoDialog = true
    },
    handleSave() {
      this.todo.id ? console.log('edit') : console.log('post')
    }
  }
}
</script>

<style scoped>
.card-box {
  width: 100%;
  max-width: 800px;
}

.add-button {
  position: absolute;
  right: 0;
  bottom: -17px;
}
</style>

