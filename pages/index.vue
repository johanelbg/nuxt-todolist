<template>
  <v-layout column justify-center align-center full-width fill-height>
    <v-card class="card-box pa-3">
      <v-layout column>
        <UpperCard/>
      </v-layout>
      <div>
        <v-layout row wrap align-center>
          <v-divider class="my-3"/>
          <v-btn @click="openDialog" color="accent" depressed fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </div>
      <div v-if="!todosLength">
        <h5 class="headline grey--text">No data yet, start by adding a task</h5>
      </div>
      <div v-else>
        <v-layout column>
          <TodoItem v-for="todo in todos" :key="todo.id" :todoItem="todo"/>
        </v-layout>
      </div>
    </v-card>
    <TodoDialog :dialogProps.sync="todoDialog" :todoProps.sync="todo" @save="handleSave"/>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

const initialState = () => ({
  text: '',
  id: ''
})

export default {
  components: {
    UpperCard: () => import('@/components/UpperCard'),
    TodoDialog: () => import('@/components/TodoDialog'),
    TodoItem: () => import('@/components/TodoItem')
  },

  data: () => ({
    todoDialog: false,
    todo: initialState()
  }),

  computed: {
    ...mapState('todos', ['todos']),
    ...mapGetters('todos', ['todosLength'])
  },

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
</style>

